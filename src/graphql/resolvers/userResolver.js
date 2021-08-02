import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import User from '../../models/User.model';

export default {
  Query: {
    users: async () => {
      const users = await User.find();
      return users;
    },
  },

  Mutation: {
    registerUser: async (parent, { user }, context, info) => {
      const newUser = await User.create({
        username: user.username,
        email: user.email,
        password: await bcrypt.hash(user.password, await bcrypt.genSalt(8)),
      });

      return newUser;
    },
    loginUser: async (parent, { user }, context, info) => {
      const findUser = await User.findOne({
        email: user.email,
      });

      if (!findUser) {
        throw new AuthenticationError('Invalid credentials');
      }

      const isSamePassword = await bcrypt.compare(user.password, findUser.password);

      if (!isSamePassword) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = await jwt.sign({ _id: findUser.id }, 'SECRET_KEY_KEEP_THIS', { expiresIn: '30d' });

      return {
        user: findUser,
        authToken: token,
      };
    },
  },
};
