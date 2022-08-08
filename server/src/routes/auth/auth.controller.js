const { saveUser, authenticateUser } = require("../../models/users.model");

const httpSignUp = async (req, res) => {
  const user = req.body;
  if (!user.username || !user.email || !user.password)
    return res.status(400).json({ error: "Required fields are missed" });
  // Check if user already exists
  const checkUserExists = await findUser({
    username: user.username,
  });
  if (checkUserExists)
    return res.status(400).json({ error: "member already exists" });
  // Save the member if it doesn't exist
  try {
    await saveUser(user);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const httpSignIn = async (req, res) => {
  const user = req.body;
  // checking the validity of user object keys
  if (!user.username || !user.password)
    return res.status(400).json({ error: "Required fields are missed" });

  // checking authentication
  const authenticatedUser = await authenticateUser(user);
  if (authenticatedUser.username)
    return res.status(200).json(authenticatedUser);
  return res.status(401).json({ error: "Wrong username or password" });
};

module.exports = { httpSignUp, httpSignIn };
