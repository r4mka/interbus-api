import dynamoose from 'dynamoose';
// import config from 'config';

// const {
//   app: { statuses, directions },
// } = config;

const StorageSchema = new dynamoose.Schema(
  {
    // keys
    pk: { type: String, hashKey: true },
    sk: {
      type: String,
      rangeKey: true,
      index: [
        {
          name: 'MainIndex',
          global: true,
          rangeKey: 'gsiSk',
          project: true,
          throughput: 2,
        },
      ],
    },
    // mostly date and status for driver and cars
    gsiSk: { type: String }, // String or Date?

    // common
    firstname: { type: String },
    lastname: { type: String },
    primaryPhonePL: { type: String },
    secondaryPhonePL: { type: String },
    primaryPhoneNL: { type: String },
    secondaryPhoneNL: { type: String },
    status: { type: String },

    // order
    from: { type: String },
    to: { type: String },
    direction: { type: String },
    clientId: { type: String },

    // car
    year: { type: Number },
    carModel: { type: String },
    seats: { type: Number },
    plate: { type: String },
    milage: { type: Number },

    // departure
    orders: { type: Number },
  },
  { timestamps: true },
);

export default dynamoose.model('Storage', StorageSchema);
