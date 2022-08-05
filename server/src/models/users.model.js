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

const getAuthenticatedUser = async (user) => {
  // Find admin
  const foundAdmin = await findAdminUser(user);
  // Find basic user
  const foundUser = await findUser(user);

  try {
    const isPassVerified = await bcrypt.compare(
      user.password,
      foundUser.password
    );

    if (foundAdmin && isPassVerified) {
      return foundAdmin;
    } else if (foundUser && isPassVerified) {
      return foundUser;
    }
    return { error: `Wrong password` };
  } catch (error) {
    return error;
  }
};

const addUser = async (userToAdd) => {
  const userId = uuidv4();
  try {
    const hashedPassword = await bcrypt.hash(userToAdd.password, 10);
    const newUser = await usersModel.findOneAndUpdate(
      { username: userToAdd.username },
      { ...userToAdd, userId, password: hashedPassword, isAdmin: false },
      { upsert: true }
    );
    return { ...userToAdd, userId, password: hashedPassword, isAdmin: false };
  } catch (error) {
    console.error(error);
  }
};

// Implementation details
const findUser = async (user) => {
  try {
    const foundUsers = await usersModel.find(
      { username: user.username },
      { __v: 0 }
    );
    const foundUser = foundUsers[0];
    return foundUser;
  } catch (error) {
    console.error("auth model", error);
    return error;
  }
};

const findAdminUser = async (user) => {
  try {
    const userAdmins = await usersModel.find(
      { username: user.username, isAdmin: true },
      { __v: 0 }
    );
    const foundAdmin = userAdmins[0];
    return foundAdmin;
  } catch (error) {
    console.error("auth model", error);
    return error;
  }
};

module.exports = { getAllUsers, getAuthenticatedUser, addUser };
