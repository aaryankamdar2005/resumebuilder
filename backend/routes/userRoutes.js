const express = require('express');
const { handleLogin, handleSignup } = require('../controllers/userController');

const userRoutes  =express.Router();

userRoutes.post("/login",handleLogin);
userRoutes.post("/signup",handleSignup);


module.exports = userRoutes;
