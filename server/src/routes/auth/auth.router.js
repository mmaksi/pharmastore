const express = require("express");
const { users } = require("../../data");
const { httpSignUp, httpSignIn } = require("./auth.controller");


const authRouter = express.Router();

authRouter.post("/signup", httpSignUp);
authRouter.post("/signin", httpSignIn);

// const setUser = (req, res, next) => {
//     const userId = req.body.userId
//     if (userId) {
//         req.user = users.find(user => user.id === userId)
//     }
//     next()
// }

module.exports = authRouter;
