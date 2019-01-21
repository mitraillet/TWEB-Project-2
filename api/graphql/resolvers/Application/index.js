import Application from "../../../server/models/Application";
import User from "../../../server/models/User";
import Project from "../../../server/models/Project";
import Message from "../../../server/models/Message";


export default {
    Query: {
        application: async (parent, {_id}, context, info) => {
            return await Application.findOne({_id}).exec();
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
        createApplication: async (parent, {application}, {req}, info) => {
            if (req.session.userId) {
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

            } else {
                throw new Error('You must be logged in to perform this action');

            }
        },
        updateApplication: async (parent, {_id, application}, {req}, info) => {
            if (req.session.userId) {

                let applicationToUpdate = await Application.findOne({_id}).exec();


                if (applicationToUpdate.user.email === req.session.userId) {

                    return new Promise((resolve, reject) => {
                        Application.findByIdAndUpdate(_id, {$set: {...application}}, {new: true}).exec(
                            (err, res) => {
                                err ? reject(err) : resolve(res);
                            }
                        );
                    });

                } else {
                    throw new Error('You can not edit another user\'s application');

                }

            } else {
                throw new Error('You must be logged in to perform this action');

            }
        },
        deleteApplication: async (parent, {_id}, {req}, info) => {

            if (req.session.userId) {

                let applicationDelete = await Application.findOne({_id}).exec();


                if (applicationDelete.user.email === req.session.userId) {
                    return new Promise((resolve, reject) => {
                        Application.findByIdAndDelete(_id).exec((err, res) => {
                            err ? reject(err) : resolve(res);
                        });
                    });

                } else {
                    throw new Error('You can not deleted another user\'s application');

                }

            } else {
                throw new Error('You must be logged in to perform this action');

            }
        }
    },
    Application: {
        user: async ({user}, args, context, info) => {
            return await User.findById(user);
        },
        project: async ({project}, args, context, info) => {
            return await Project.findById(project);
        },
        messages: async ({_id}, args, context, info) => {
            return await Message.find({application: _id});
        }
    }
};
