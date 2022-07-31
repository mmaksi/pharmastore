const express = require("express");
const { httpSignUp, httpSignIn } = require("./auth.controller");


const authRouter = express.Router();

authRouter.post("/signup", httpSignUp);
authRouter.post("/signin", httpSignIn);

module.exports = authRouter;
