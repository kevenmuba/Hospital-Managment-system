// profile.service.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

class ProfileService {
  constructor(jwtSecret) {
    this.jwtSecret = jwtSecret;
  }

  async getUserProfile(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.jwtSecret, {}, async (err, userData) => {
        if (err) {
          return reject(err);
        }
        
        const userDoc = await User.findById(userData.id);
        if (!userDoc) {
          return reject(new Error('User not found'));
        }

        const { name, email, _id } = userDoc;
        resolve({ name, email, _id });
      });
    });
  }
}

module.exports = ProfileService;