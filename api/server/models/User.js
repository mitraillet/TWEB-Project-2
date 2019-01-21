import mongoose from "mongoose";
import { ObjectID } from "mongodb";
import Project from "./Project";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  projectsProposed: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project"
    }
  ],
  applications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Application"
    }
  ],
  projectsApplicable: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project"
    }
  ]

});

export default mongoose.model("User", UserSchema);
