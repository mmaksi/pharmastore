const express = require("express");
const { httpSignUp, httpSignIn, httpAddPharmacistId } = require("./auth.controller");


const authRouter = express.Router();

authRouter.post("/", httpAddPharmacistId);
authRouter.post("/signup", httpSignUp);
authRouter.post("/signin", httpSignIn);

module.exports = authRouter;
