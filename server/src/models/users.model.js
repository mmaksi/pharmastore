const usersModel = require("./users.mongo");

const getAllUsers = async () => {
  const users = await usersModel.find({}, { __v: 0 });
  return users;
};

const getUser = async (userName) => {
  const user = await usersModel.find({ name: userName }, { __v: 0, _id: 0 });
  return user;
};

const addUser = async (userToAdd) => {
  await usersModel.findOneAndUpdate({ name: userToAdd.name }, userToAdd, {
    upsert: true,
  });
};

module.exports = { getAllUsers, getUser, addUser };
