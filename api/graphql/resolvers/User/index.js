import User from "../../../server/models/User";


export default {
  Query: {
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
        password: u.password
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
    updateUser: async (parent, { _id, user }, context, info) => {
      return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(_id, { $set: { ...user } }, { new: true }).exec(
            (err, res) => {
              err ? reject(err) : resolve(res);
            }
        );
      });
    },
    deleteUser: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        User.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    login: async (parent, { email, password }, { req }) => {
      let user= await User.findOne({ "email": email }).exec();
      if (user) {
        if (password=== user.password) {
          req.session.userId = email;
          return true;
        }

        throw new Error('Incorrect password.');
      }

      throw new Error('No Such User exists.');
    },
    logout:(parent,_, { req }) => {
      req.session.destroy();

      return true

    }
  }
};
