const express = require("express");
const { users } = require("../../data");
const { httpGethome, httpGetDashboard, httpGetAdmin } = require("./auth.controller");


const authRouter = express.Router();

authRouter.get("/", httpGethome);
authRouter.get("/dashboard", httpGetDashboard);
authRouter.post("/admin", httpGetAdmin);

const setUser = (req, res, next) => {
    const userId = req.body.userId
    if (userId) {
        req.user = users.find(user => user.id === userId)
    }
    next()
}

module.exports = authRouter;
