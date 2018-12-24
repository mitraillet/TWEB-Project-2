import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
    return this.toString();
};

const MessageSchema = new Schema({
    sender:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    application:{
        type: Schema.Types.ObjectId,
        ref:"Application"
    },
    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },



});

export default mongoose.model("Message", MessageSchema);
