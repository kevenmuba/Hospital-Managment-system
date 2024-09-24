// register.routes.js
const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/register.controller');

// Initialize the controller with your JWT secret
const jwtSecret = process.env.JWT_SECRET; // Ensure you have your secret in environment variables
const registerController = new RegisterController(jwtSecret);

// Define the registration route
router.post('/api/register', (req, res) => registerController.register(req, res));

module.exports = router;