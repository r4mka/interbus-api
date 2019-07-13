import moment from 'moment';

export * from './cars';
export * from './departures';
export * from './lists';

const base64Encode = value => value && Buffer.from(JSON.stringify(value)).toString('base64');
const base64Decode = value =>
  value && JSON.parse(Buffer.from(JSON.stringify(value), 'base64').toString('utf-8'));

const transformResponse = data => ({ items: data, lastKey: base64Encode(data.lastKey) });

export const paginateQuery = (query, { limit, lastKey } = {}) =>
  query
    .startAt(base64Decode(lastKey))
    .limit(limit)
    .exec()
    .then(transformResponse);

export const rangeQuery = (baseQuery, { date, from, to, ...queryStringParameters } = {}) => {
  let query = baseQuery;

  if (date) {
    query = baseQuery.where('date').eq(moment(+date).valueOf());
  }
  if (from && to) {
    query = baseQuery.where('date').between(moment(+from).valueOf(), moment(+to).valueOf());
  }
  if (from) {
    query = baseQuery.where('date').ge(moment(+from).valueOf());
  }
  if (to) {
    query = baseQuery.where('date').le(moment(+to).valueOf());
  }

  return paginateQuery(query, queryStringParameters);
};
