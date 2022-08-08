const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const usersModel = require("./users.mongo");

const getAllUsers = async () => {
  try {
    const users = await usersModel.find({}, { __v: 0 });
    return users;
  } catch (error) {
    console.error(error);
  }
};

const addUser = async (userToAdd) => {
  const userId = uuidv4();
  try {
    const hashedPassword = await bcrypt.hash(userToAdd.password, 10);
    const newUser = await usersModel.findOne({ username: userToAdd.username });
    if (newUser) {
      return { error: "member already exists" };
    } else {
      return { ...userToAdd, userId, password: hashedPassword, isAdmin: false };
    }
  } catch (error) {
    console.error(error);
  }
};

const saveUser = async (user) => {
  const newUser = new usersModel({ ...user });
  // Save the document only if the user does not already exist in the database
  try {
    const foundUser = await findUser(user);
    if (!foundUser) return newUser.save();
  } catch (error) {
    console.error(`Can't add the user: ${error}`);
  }
};

/* Implementation details */
const findUser = async (user) => {
  try {
    const foundUser = await usersModel.findOne(
      { username: user.username },
      { __v: 0 }
    );
    return foundUser;
  } catch (error) {
    return error;
  }
};

const authenticateUser = async (userToAuthenticate) => {
  const { password: signInPassword } = userToAuthenticate;
  // authenticate by querying the DB by name
  const existedUser = await findUser(userToAuthenticate);
  if (!existedUser) return false;
  // authenticate password
  const existedHashedPassword = existedUser ? existedUser.password : null;
  const passwordIsMatched = checkMatchingPasswords(
    signInPassword,
    existedHashedPassword
  );
  if (existedUser && passwordIsMatched) return existedUser;
  return false;
};

const checkMatchingPasswords = (signInPassword, existedHashedPassword) => {
  return bcrypt.compareSync(signInPassword, existedHashedPassword);
};

module.exports = {
  getAllUsers,
  saveUser,
  authenticateUser,
};
