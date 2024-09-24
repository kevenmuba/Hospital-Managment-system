// register.service.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

class RegisterService {
  constructor(jwtSecret) {
    this.jwtSecret = jwtSecret; // Store JWT secret
  }

  async registerUser({ name, email, password }) {
    const hashedPassword = bcrypt.hashSync(password, 10); // Use a salt value of 10

    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate a JWT token for the newly registered user
    const token = jwt.sign(
      { email: userDoc.email, id: userDoc._id },
      this.jwtSecret,
      {}
    );

    return { userDoc, token }; // Return both user document and token
  }
}

module.exports = RegisterService;