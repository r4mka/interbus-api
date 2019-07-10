import dynamoose from 'dynamoose';

const StorageSchema = new dynamoose.Schema(
  {
    // keys
    pk: { type: String, hashKey: true },
    sk: {
      type: String,
      rangeKey: true,
      index: [
        {
          name: 'StatusGlobalIndex',
          global: true,
          rangeKey: 'status',
          project: true,
          throughput: 2,
        },
        {
          name: 'DateGlobalIndex',
          global: true,
          rangeKey: 'date',
          project: true,
          throughput: 2,
        },
      ],
    },
    // GSI sort keys
    date: { type: Date },
    // todo: add status validation in lambda functions
    status: { type: String },

    // common
    firstname: { type: String },
    lastname: { type: String },
    primaryPhonePL: { type: String },
    secondaryPhonePL: { type: String },
    primaryPhoneNL: { type: String },
    secondaryPhoneNL: { type: String },

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

    // departure, client
    orders: { type: Number },
  },
  { timestamps: true },
);

export default dynamoose.model('Storage', StorageSchema);
