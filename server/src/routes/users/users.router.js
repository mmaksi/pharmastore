const express = require("express");
const { httpAddUser, httpGetAllUsers, httpGetUser } = require("./users.controller");

const usersRouter = express.Router();

usersRouter.post("/", httpAddUser);
usersRouter.get("/", httpGetAllUsers);
usersRouter.get("/:userName", httpGetUser);

module.exports = usersRouter;
