import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  username: { 
    type: String, 
    unique: true, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  accounts: [
    Schema.Types.ObjectId
  ],
  transactions: [
    Schema.Types.ObjectId
  ],
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('client', schema);
