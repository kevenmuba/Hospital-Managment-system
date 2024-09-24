// profile.controller.js
const ProfileService = require('../services/profile.service');

class ProfileController {
  constructor(jwtSecret) {
    this.profileService = new ProfileService(jwtSecret);
  }

  async getProfile(req, res) {
    const { token } = req.cookies;

    if (token) {
      try {
        const userProfile = await this.profileService.getUserProfile(token);
        res.json(userProfile); // Send back user profile data
      } catch (e) {
        res.status(401).json({ error: e.message }); // Unauthorized access
      }
    } else {
      res.json(null); // No token means no user profile
    }
  }
}

module.exports = ProfileController;