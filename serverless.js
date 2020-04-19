const path = require('path');
const functions = require('./serverless.functions');

const service = 'interbus-api';
const { ENVIRONMENT = 'development', AWS_ACCOUNT_ID, OFFLINE_PORT } = process.env;

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
  plugins: ['serverless-webpack', 'serverless-dynamodb-local', 'serverless-offline'],
  custom: {
    'serverless-offline': {
      host: '0.0.0.0',
      httpPort: OFFLINE_PORT,
      noPrependStageInUrl: true,
    },
    webpack: {
      includeModules: true,
    },
    dynamodb: {
      start: {
        port: 8000,
        dbPath: path.resolve(__dirname, '.dynamodb'),
      },
      stages: ['development'],
    },
  },
  functions,
};
