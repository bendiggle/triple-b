const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

module.exports = {
  Query: {
    user: async (parent, { id }, { models: { userModel } }, info) => {
      const user = await userModel.findById({ _id: id }).exec();
      return user;
    },
  },
  Mutation: {
    createUser: async (parent, { name, nickName }, { models: { userModel } }, info) => {
      const user = await userModel.create({ name, nickName });
      return user;
    },
  }
};