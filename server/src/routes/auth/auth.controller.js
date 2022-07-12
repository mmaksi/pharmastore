const { addUser, getAuthenticatedUser } = require("../../models/users.model");

const httpSignUp = async (req, res) => {
  const user = req.body;
  if (!user.username || !user.email || !user.password)
    return res.status(400).json({ error: "Required fields are missed" });
  try {
    const newUser = await addUser(user);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.json(error);
  }
};

const httpSignIn = async (req, res) => {
  const user = req.body;
  if (!user.username || !user.password)
    return res.status(400).json({ error: "Required fields are missed" });
  try {
    const authenticatedUser = await getAuthenticatedUser(user);
    return res.status(200).json(authenticatedUser);
  } catch (error) {
    return res.json(error);
  }
};

module.exports = { httpSignUp, httpSignIn };
