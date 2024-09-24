// profile.routes.js
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profile.cotroller');

// Initialize the controller with your JWT secret
const jwtSecret = process.env.JWT_SECRET; // Ensure you have your secret in environment variables
const profileController = new ProfileController(jwtSecret);

// Define the profile route
router.get('/api/profile', (req, res) => profileController.getProfile(req, res));

module.exports = router;