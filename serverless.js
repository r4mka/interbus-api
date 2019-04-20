const functions = require('./serverless.functions');

const service = 'interbus-api';
const {
  ENVIRONMENT = 'development',
  AWS_ACCOUNT_ID,
  OFFLINE_PORT,
  // OFFLINE_API_KEY,
} = process.env;

module.exports = {
  service,
  provider: {
    name: 'aws',
    role: `arn:aws:iam::${AWS_ACCOUNT_ID}:role/service-role/aws-lambda-access`,
    runtime: 'nodejs8.10',
    timeout: 30,
    region: 'eu-west-1',
    stage: ENVIRONMENT,
    environment: { BUILD_TIME: +new Date(), STAGE: ENVIRONMENT, ENVIRONMENT },
    apiName: service,
    stackName: service,
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline',
    'serverless-dynamodb-local',
  ],
  custom: {
    'serverless-offline': {
      host: '0.0.0.0',
      port: OFFLINE_PORT,
      // apiKey: OFFLINE_API_KEY,
    },
    webpack: {
      includeModules: true,
    },
    dynamodb: {
      start: {
        port: 8000,
        inMemory: true,
      },
    },
  },
  functions,
};
