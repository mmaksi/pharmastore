const {
  addUser,
  authenticateUser,
  saveId,
} = require("../../models/users.model");

const httpSignUp = async ({ body: user }, res) => {
  const { username, email, password, pharmacistId } = user;
  // Check user inputs
  if (!username || !email || !password || !pharmacistId)
    return res.status(400).json({ error: "required fields are missing" });
  // Save user if inputs are valid
  try {
    const response = await addUser(user);
    if (response.error) return res.status(400).json(response);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const httpSignIn = async ({ body: user }, res) => {
  const { username, password } = user;
  // Check user's inputs
  if (!username || !password)
    return res.status(400).json({ error: "Required fields are missing" });

  // Authenticating user's credentials...
  const authenticatedUser = await authenticateUser(user);
  // Returns a custom response message
  switch (authenticatedUser.error) {
    case "Wrong username":
      res.status(401).json({ error: "Wrong username" });
      break;
    case "Wrong password":
      res.status(401).json({ error: "Wrong password" });
      break;
    default:
      res.status(200).json(authenticatedUser);
      break;
  }
};

const httpAddPharmacistId = async (req, res) => {
  const { pharmacistId } = req.body;
  try {
    await saveId(pharmacistId);
    return { pharmacistId: pharmacistId };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { httpSignUp, httpSignIn, httpAddPharmacistId };
