const { getAllUsers, getUser, addUser } = require("../../models/users.model");

const httpGetAllUsers = async (req, res) => {
  const users = await getAllUsers();
  return res.status(200).json(users);
};

const httpGetUser = async (req, res) => {
  const userName = req.params.userName;
  const user = await getUser(userName);
  if (user) return res.status(200).json(user);
  res.status(404).json({ error: "user not found " });
};

const httpAddUser = async (req, res) => {
  const user = req.body;

  await addUser(user);
  res.status(201).json(user);
};

module.exports = {
  httpGetAllUsers,
  httpGetUser,
  httpAddUser,
};
