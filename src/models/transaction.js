import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    account_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    sum: {
        type: Number,
        required: true
    },
    successful: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('transaction', schema);
