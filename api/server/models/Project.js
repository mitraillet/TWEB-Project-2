import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
    return this.toString();
};

const ProjectSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    amount: {
        type: Number,
        min: 0,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    timeEstimated: {
        type: Date,
        required: true
    },
    technologies: {
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['Proposed', 'Appoved', 'Work in progress', 'Delivered'],
        required: true
    },
    deadline:{
        type: Date,
        required: true
    },
    customer:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    applications:[{
        type: Schema.Types.ObjectId,
        ref:"Application"
    }]

});

export default mongoose.model("Project", ProjectSchema);
