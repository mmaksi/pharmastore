const express = require("express");
const { httpAddUser, httpGetUser } = require("./users.controller");

const usersRouter = express.Router();

usersRouter.post("/generateToken", httpAddUser);
usersRouter.get("/validateToken", httpGetUser);


module.exports = usersRouter;
