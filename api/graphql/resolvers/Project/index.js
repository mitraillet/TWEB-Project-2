import Project from "../../../server/models/Project";
import User from "../../../server/models/User";
import Application from "../../../server/models/Application";


import {
    DateTime,
    NonPositiveInt,
    PositiveInt,
    NonNegativeInt,
    NegativeInt,
    NonPositiveFloat,
    PositiveFloat,
    NonNegativeFloat,
    NegativeFloat,
    EmailAddress,
    URL,
    PhoneNumber,
    PostalCode,
} from '@okgrow/graphql-scalars';


export default {
    DateTime,
    Query: {
        project: async (parent, { _id }, context, info) => {
            return await Project.findOne({ _id }).exec();
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
        createProject: async (parent, { project }, context, info) => {
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
        },
        updateProject: async (parent, { _id, project }, context, info) => {
            return new Promise((resolve, reject) => {
                Project.findByIdAndUpdate(_id, { $set: { ...project } }, { new: true }).exec(
                    (err, res) => {
                        err ? reject(err) : resolve(res);
                    }
                );
            });
        },
        deleteProject: async (parent, { _id }, context, info) => {
            return new Promise((resolve, reject) => {
                Project.findByIdAndDelete(_id).exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        }
    },
    Project: {
        customer: async ({ customer }, args, context, info) => {
            return await User.findById(customer);
        },
        applications: async ({ _id }, args, context, info) => {
            return await Application.find({ project: _id });
        }
    }
};
