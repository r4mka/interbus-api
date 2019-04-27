import dynamoose from 'dynamoose';
import config from 'config';

const {
  app: { statuses, directions },
} = config;

const StorageSchema = new dynamoose.Schema(
  {
    pk: { type: String, hashKey: true },
    sortKey: {
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

    // driver
    car: { type: String },
    name: { type: String },
    status: { type: String, enum: statuses },

    // car
    model: { type: String },
    year: { type: Number },
    milage: { type: Number },
    driver: { type: String },
    seats: { type: Number },

    // trip
    takenSeats: { type: Number },
    direction: { type: String, enum: directions },
    date: { type: String },
  },
  { timestamps: true },
);

export default dynamoose.model('Storage', StorageSchema);
