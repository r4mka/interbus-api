import middy from 'middy';
import dynamoose from 'dynamoose';
import {
  cors,
  httpEventNormalizer,
  httpHeaderNormalizer,
  jsonBodyParser,
  urlEncodeBodyParser,
} from 'middy/middlewares';

const { ENVIRONMENT, IS_OFFLINE, USE_REMOTE_DB, DYNAMO_ENDPOINT } = process.env;

if (IS_OFFLINE && !USE_REMOTE_DB) {
  dynamoose.local(DYNAMO_ENDPOINT);
}

dynamoose.setDefaults({
  create: true,
  prefix: `${ENVIRONMENT}_`,
});

process.on('unhandledRejection', console.error); // print stacktrace for unhandled promises rejection

const transformResponse = data => ({ statusCode: 200, body: JSON.stringify(data) });

/**
 * Middy middleware wrapper that prepares lambda function to work.
 *
 * @param fn                lambda function
 * @returns {middy.IMiddy}
 */
export default (fn) => {
  const handler = middy((...args) =>
    Promise.resolve(fn(...args)).then(transformResponse),
  )
    .use(cors())
    .use(httpEventNormalizer())
    .use(httpHeaderNormalizer())
    .use(jsonBodyParser())
    .use(urlEncodeBodyParser());

  // handle http errors thrown from lambda functions
  handler.onError((h, next) => {
    const { statusCode: status, code: codeName, name, message } = h.error;
    const code = codeName || name;
    const statusCode = status || (code === 'ValidationError' && 400) || 500;
    const body = { statusCode, code, message };

    h.response = Object.assign(h.response || {}, {
      statusCode,
      body: JSON.stringify(body),
    });

    return next();
  });

  handler.after((h, next) => {
    // make sure that headers are always available
    h.response.headers = h.response.headers || {};

    next();
  });

  return handler;
};
