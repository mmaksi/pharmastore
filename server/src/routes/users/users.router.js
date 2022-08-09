const express = require("express");
const jwt = require("jsonwebtoken");
const { httpGetUsers } = require("./users.controller");

// JWT middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "no authorization header" });
    
  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) return res.status(403).json(error);
    req.user = user;
    next();
});
};

const usersRouter = express.Router();

usersRouter.get("/", httpGetUsers);

module.exports = usersRouter;
