const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const idsModel = require("./ids.mongo");
const usersModel = require("./users.mongo");
const { findPharmacistId } = require("./ids.model");

const addUser = async ({ pharmacistId, username, email, password }) => {
  const userId = uuidv4();
  // Check if pharmacistId is true
  const checkIdExists = await findPharmacistId(pharmacistId);
  console.log("checkIdExists", checkIdExists);
  if (!checkIdExists) return { error: "Pharmacist ID is not found" };
  try {
    // Hash user's password before saving it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    // Checks if user already exists by username
    const foundUser = await findUserByUsername(username);
    if (foundUser) {
      return { error: "User already exists" };
    } else {
      // Save user only if it doens't already exist && if he has a valid pharmacist ID
      const user = {
        userId,
        username,
        email,
        password: hashedPassword,
        isAdmin: false,
      };
      await saveUser(user);
      return user;
    }
  } catch (error) {
    console.error(error);
  }
};

const getUsers = async () => {
  const users = await usersModel.find({}, { __v: 0 });
  return users
};

const authenticateUser = async ({ username, password: signInPassword }) => {
  // Check username validity
  const existedUser = await findUserByUsername(username);
  if (!existedUser) return { error: "Wrong username" };

  // Check password validity
  const existedHashedPassword = existedUser ? existedUser.password : null;
  const passwordIsMatched = checkMatchingPasswords(
    signInPassword,
    existedHashedPassword
  );
  if (!passwordIsMatched) return { error: "Wrong password" };

  // Return the queried user onyl if both username and password are valid
  if (existedUser && passwordIsMatched) return existedUser;
};

/* Implementation details for the model only */
const findUserByUsername = async (username) => {
  try {
    const foundUser = await usersModel.findOne({ username }, { __v: 0 });
    return foundUser;
  } catch (error) {
    return error;
  }
};

const checkMatchingPasswords = (signInPassword, existedHashedPassword) => {
  return bcrypt.compareSync(signInPassword, existedHashedPassword);
};

const saveUser = async (user) => {
  const newUser = new usersModel({ ...user });
  // Save the document only if the user does not already exist in the database
  return newUser.save();
};

const saveId = async (id) => {
  const newId = new idsModel({ pharmacistId: id });
  // Save the document only if the user id does not already exist in the database
  try {
    const foundId = await findPharmacistId(id);
    if (!foundId) return newId.save();
  } catch (error) {
    console.error(`Can't add the user: ${error}`);
  }
};

module.exports = {
  addUser,
  getUsers,
  authenticateUser,
  findPharmacistId,
  saveId,
};
