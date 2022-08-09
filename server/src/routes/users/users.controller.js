const { getUsers } = require("../../models/users.model")

const httpGetUsers = async (req, res) => {
  const users = await getUsers()
  return res.status(200).json(users);
};

module.exports = {
  httpGetUsers,
};