import { head } from 'lodash';
import dynamoose from 'dynamoose';
import config from 'config';

const {
  app: { statuses },
} = config;

const StorageSchema = new dynamoose.Schema(
  {
    pk: {
      type: String,
      hashKey: true,
    },
    sk: {
      type: String,
      rangeKey: true,
      index: {
        global: true,
        // rangeKey: 'ownerId',
        project: true, // ProjectionType: ALL
        throughput: 2, // read and write are both 5
      },
    },
    status: {
      type: String,
      enum: statuses,
      default: head(statuses),
    },
    car: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true },
);

export default dynamoose.model('Storage', StorageSchema);
