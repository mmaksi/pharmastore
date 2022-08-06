const { getAllUsers, getUser, addUser } = require("../../models/users.model");

const httpGetAllUsers = async (req, res) => {
  const users = await getAllUsers();
  return res.status(200).json(users);
};

const httpAddUser = async (req, res) => {
  const user = req.body;
  await addUser(user);
  res.status(201).json(user);
};

module.exports = {
  httpGetAllUsers,
  httpAddUser,
};