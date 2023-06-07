import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('Task', TaskSchema);
