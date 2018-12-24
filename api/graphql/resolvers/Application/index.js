import Application from "../../../server/models/Application";
import User from "../../../server/models/User";
import Project from "../../../server/models/Project";
import Message from "../../../server/models/Message";



export default {
    Query: {
        application: async (parent, { _id }, context, info) => {
            return await Application.findOne({ _id }).exec();
        },
        applications: async (parent, args, context, info) => {
            const applications = await Application.find({})
                .populate()
                .exec();

            return applications.map(u => ({
                _id: u._id.toString(),
                user: u.user,
                project: u.project,
                status: u.status,
                messages: u.messages
            }));
        }
    },
    Mutation: {
        createApplication: async (parent, { application }, context, info) => {
            const newApplication = await new Application({
                user: application.user,
                project: application.project,
                status: application.status,
                messages: application.messages
            });

            return new Promise((resolve, reject) => {
                newApplication.save((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },
        updateApplication: async (parent, { _id, application }, context, info) => {
            return new Promise((resolve, reject) => {
                Application.findByIdAndUpdate(_id, { $set: { ...application } }, { new: true }).exec(
                    (err, res) => {
                        err ? reject(err) : resolve(res);
                    }
                );
            });
        },
        deleteApplication: async (parent, { _id }, context, info) => {
            return new Promise((resolve, reject) => {
                Application.findByIdAndDelete(_id).exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        }
    },
    Application: {
        user: async ({ user }, args, context, info) => {
            return await User.findById(user);
        },
        project: async ({ project }, args, context, info) => {
            return await Project.findById({ project });
        },
        messages: async ({ _id }, args, context, info) => {
            return await Message.find({ application: _id });
        }
    }
};
