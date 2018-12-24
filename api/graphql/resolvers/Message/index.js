import Message from "../../../server/models/Message";
import User from "../../../server/models/User";
import Project from "../../../server/models/Project";


export default {
    Query: {
        message: async (parent, {_id}, context, info) => {
            return await Message.findOne({_id}).exec();
        },
        messages: async (parent, args, context, info) => {
            const messages = await Message.find({})
                .populate()
                .exec();

            return messages.map(u => ({
                _id: u._id.toString(),
                sender: u.sender,
                application: u.application,
                subject: u.subject,
                body: u.body,
                date: u.date
            }));
        }
    },
    Mutation: {
        createMessage: async (parent, {message}, {req}, info) => {
            if (req.session.userId) {

                const newMessage = await new Message({
                    sender: message.sender,
                    application: message.application,
                    subject: message.subject,
                    body: message.body,
                    date: message.date
                });

                return new Promise((resolve, reject) => {
                    newMessage.save((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
                });
            } else {
                throw new Error('You must be logged in to perform this action');

            }
        },
        updateMessage: async (parent, {_id, message}, {req}, info) => {

            if (req.session.userId) {

                let messageToUpdate = await Message.findOne({_id}).exec();


                if (messageToUpdate.sender.email === req.session.userId) {
                    return new Promise((resolve, reject) => {
                        Message.findByIdAndUpdate(_id, {$set: {...message}}, {new: true}).exec(
                            (err, res) => {
                                err ? reject(err) : resolve(res);
                            }
                        );
                    });
                } else {
                    throw new Error('You can not edit another user\'s message');

                }

            } else {
                throw new Error('You must be logged in to perform this action');

            }
        },
        deleteMessage: async (parent, {_id}, {req}, info) => {

            if (req.session.userId) {

                let messageToDelete = await Message.findOne({_id}).exec();


                if (messageToDelete.sender.email === req.session.userId) {
                    return new Promise((resolve, reject) => {
                        Message.findByIdAndDelete(_id).exec((err, res) => {
                            err ? reject(err) : resolve(res);
                        });
                    });

                } else {
                    throw new Error('You can not deleted another user\'s message');

                }

            } else {
                throw new Error('You must be logged in to perform this action');

            }

        }
    },
    Message: {
        application: async ({application}, args, context, info) => {
            return await Message.findById({application});
        }
    }
};
