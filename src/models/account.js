import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
});

export default mongoose.model('account', schema);