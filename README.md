# interbus-api

## Local development

### Requirements

- `java` - Java Runtime Engine (JRE) version 6.x or newer
- `node` - v8.10.0+
- `npm`  - v5.7.0+

### Environment variables

Project depends on the environment variables specific per user/environment that runs or deploys
the project. It is required to create the `.env` file using the content of `.env.example` which
describes all necessary variables.

In addition - to avoid storing AWS credentials here, `AWS_PROFILE` variable is used which refers
to the profile name that is described in two user's files:

`~/.aws/config`

Next step is setting up the `.env` variables - copy content from the `.env.example` and set prover
values.

| Variable                 | Default value | Description                                                                                                                   |
| ------------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| NODE_PATH                | src           | Ppoints `src/` dir as an internal modules location.                                                 |
| AWS_PROFILE              | aws_profile   | Name of the AWS profile.                                                                                                      |
| AWS_ACCOUNT_ID           | 123456789012  | AWS Account ID (find in your account).                                                                                |
| AWS_REGION               | eu-west-1     | AWS Region.                                                                                   |
| ENVIRONMENT              | development   | Use `development` locally; other options used for deployment are `staging` and `production`.                                  |
| OFFLINE_PORT             | 3002          | Local API Gateway port.                                                                                                       |
| USE_REMOTE_DB            |               | If set to `true`, remote AWS DynamoDB is used instead of local.                                                               |

To setup the project on your local environment, you'll have to start with installing local DynamoDB
and npm dependencies using:

    npm install
    npx sls dynamodb install

After that, you can decrypt configuration and start the local instance using:

    npm start

It will run the API Gateway locally on port `3002` (ref: `OFFLINE_PORT`) and local DynamoDB
instance on port `8000`.

You can also attach DynamoDB admin viewer on port `8001` using:

    npm run dynamodb:admin

## NPM tasks

| Task name                    | Description                                                                                              |
| ---------------------------- | -------------------------------------------------------------------------------------------------------- |
| `start`                      | Starts local API Gateway development server on `OFFLINE_PORT` port.                                      |
| `dynamodb`                   | Starts Local DynamoDB server. `start` and `start:debug` start it automatically.                          |
| `dynamodb:admin`             | Starts DynamoDB admin panel on port `8001`.                                                              |
