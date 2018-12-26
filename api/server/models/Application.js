import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
    return this.toString();
};

const ApplicationSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    project:{
        type: Schema.Types.ObjectId,
        ref:"Project"
    },
    status:{
        type: String,
        enum: ['Proposed', 'Accepted', 'Refused'],
        required: true
    },
    messages:{
        type: Schema.Types.ObjectId,
        ref:"Message"
    },



});

export default mongoose.model("Application", ApplicationSchema);
