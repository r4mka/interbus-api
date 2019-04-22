import dynamoose from 'dynamoose';
import config from 'config';

const {
  app: { statuses, directions },
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
      index: [
        {
          global: true,
          project: true,
          throughput: 2,
        },
        {
          name: 'dateGlobalIndex',
          global: true,
          rangeKey: 'date',
          project: true,
          throughput: 2,
        },
      ],
    },
    date: {
      type: String,
    },
    status: {
      type: String,
      enum: statuses,
    },
    car: {
      type: String,
    },
    name: {
      type: String,
    },
    driver: {
      type: String,
    },
    seats: {
      type: Number,
    },
    takenSeats: {
      type: Number,
    },
    direction: {
      type: String,
      enum: directions,
    },
  },
  { timestamps: true },
);

export default dynamoose.model('Storage', StorageSchema);
