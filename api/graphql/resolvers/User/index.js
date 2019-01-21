import User from "../../../server/models/User";
import Project from "../../../server/models/Project";
import Application from "../../../server/models/Application";


import {
  EmailAddress,
} from '@okgrow/graphql-scalars';

export default {
  EmailAddress,
  Query: {
    me: (_, __, { req }) => {
      console.log(req.session.userId);
      if (req.session.userId) {
        return User.findOne({email: req.session.userId})
      }
      else {
        return null;
      }
    },
    user: async (parent, { _id }, context, info) => {
      return await User.findOne({ _id }).exec();
    },
    users: async (parent, args, context, info) => {
      const users = await User.find({})
          .populate()
          .exec();

      return users.map(u => ({
        _id: u._id.toString(),
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        company: u.company,
        projectsProposed: u.projectsProposed,
        applications: u.applications
      }));
    },
    isLogin: (_, __, { req }) => {
      if (req.session.userId) {
        return `Cookie found! Your id is: ${req.session.userId}`;
      } else {
        return "Could not find cookie :(";
      }
    }
  },
  Mutation: {
    createUser: async (parent, { user }, context, info) => {
      const newUser = await new User({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          company: user.company,
          password: user.password
      });

      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateUser: async (parent, { _id, user }, { req }, info) => {
      if (req.session.userId) {
        return new Promise((resolve, reject) => {
          User.findByIdAndUpdate(_id, {$set: {...user}}, {new: true}).exec(
              (err, res) => {
                err ? reject(err) : resolve(res);
              }
          );
        });
      }
      else
      {
        throw new Error('You must be logged in to perform this action');
      }
    },
    deleteUser: async (parent, { _id }, { req }, info) => {

      if (req.session.userId) {
        return new Promise((resolve, reject) => {
          User.findByIdAndDelete(_id).exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
        });
      }
      else
      {
        throw new Error('You must be logged in to perform this action');
      }
    },
    login: async (parent, { email, password }, { req }) => {
      let user= await User.findOne({ "email": email });
      if (!user || password!== user.password) {
        throw new Error('Invalid email or password');
      }
      req.session.userId = email;
      return user;
    },
    logout:(parent,_, { req }) => {
      req.session.destroy();

      return true

    }
  },
  User: {
    projectsProposed: async ({ _id }, args, context, info) => {
      return await Project.find({ customer: _id });
    },
    applications: async ({ _id }, args, context, info) => {
      return await Application.find({ user: _id });
    },
    projectsApplicable: async ({_id}, args, context, info) => {
      return await Project.find(  { $and: [ { customer: { $ne: _id}}, {'applications.user._id' : {$ne: _id}}]} );
    }
  }
};
