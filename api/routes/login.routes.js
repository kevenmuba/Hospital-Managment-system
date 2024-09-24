// login.routes.js
const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/login.controller');

// Initialize the controller with your JWT secret
const jwtSecret = process.env.JWT_SECRET; // Ensure you have your secret in environment variables
const loginController = new LoginController(jwtSecret);

// Define the login route
router.post('/api/login', (req, res) => loginController.login(req, res));

// Define the logout route
router.post('/api/logout', (req, res) => loginController.logout(req, res));

module.exports = router;