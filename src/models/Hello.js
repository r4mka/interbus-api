import dynamoose from 'dynamoose';

const HelloSchema = new dynamoose.Schema({
  id: {
    type: Number,
    validate: function(v) { return v > 0; },
    hashKey: true
  },
  name: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default dynamoose.model('Hello', HelloSchema);
