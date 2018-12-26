import Project from "../../../server/models/Project";
import User from "../../../server/models/User";
import Application from "../../../server/models/Application";


import {
    DateTime,
    PositiveInt,
} from '@okgrow/graphql-scalars';


export default {
    DateTime,
    PositiveInt,
    Query: {
        project: async (parent, {_id}, context, info) => {
            return await Project.findOne({_id}).exec();
        },
        projects: async (parent, args, context, info) => {
            const projects = await Project.find({})
                .populate()
                .exec();

            return projects.map(u => ({
                _id: u._id.toString(),
                name: u.name,
                amount: u.amount,
                description: u.description,
                timeEstimated: u.timeEstimated,
                technologies: u.technologies,
                status: u.status,
                deadline: u.deadline,
                customer: u.customer,
                applications: u.applications,

            }));
        }
    },
    Mutation: {
        createProject: async (parent, {project}, {req}, info) => {
            if (req.session.userId) {

                const newProject = await new Project({
                    name: project.name,
                    amount: project.amount,
                    description: project.description,
                    timeEstimated: project.timeEstimated,
                    technologies: project.technologies,
                    status: project.status,
                    deadline: project.deadline,
                    customer: project.customer,
                });

                return new Promise((resolve, reject) => {
                    newProject.save((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
                });
            } else {
                throw new Error('You must be logged in to perform this action');

            }
        },
        updateProject: async (parent, {_id, project}, {req}, info) => {
            if (req.session.userId) {

                let projectToUpdate = await Project.findOne({_id}).exec();


                if (projectToUpdate.customer.email === req.session.userId) {

                    return new Promise((resolve, reject) => {
                        Project.findByIdAndUpdate(_id, {$set: {...project}}, {new: true}).exec(
                            (err, res) => {
                                err ? reject(err) : resolve(res);
                            }
                        );
                    });
                } else {
                    throw new Error('You can not edit another user\'s project');

                }

            } else {
                throw new Error('You must be logged in to perform this action');

            }
        },
        deleteProject: async (parent, {_id}, {req}, info) => {
            if (req.session.userId) {

                let projectToUpdate = await Project.findOne({_id}).exec();


                if (projectToUpdate.customer.email === req.session.userId) {

                    return new Promise((resolve, reject) => {
                        Project.findByIdAndDelete(_id).exec((err, res) => {
                            err ? reject(err) : resolve(res);
                        });
                    });

                } else {
                    throw new Error('You can not edit another user\'s project');

                }

            } else {
                throw new Error('You must be logged in to perform this action');

            }
        }
    },
    Project: {
        customer: async ({customer}, args, context, info) => {
            return await User.findById(customer);
        },
        applications: async ({_id}, args, context, info) => {
            return await Application.find({project: _id});
        }
    }
};
