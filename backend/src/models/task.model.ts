import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    id: {   
        type: String,
        required: true
    },
    Description: {
        type: Object,
        required: true
    },
    Unit : {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    Rate : {
        type: Number,
        required: true
    },
    Amount : {
        type: Number,
        required: true
    },
}
);

const Task = mongoose.model('Task', TaskSchema);

export default Task;
    