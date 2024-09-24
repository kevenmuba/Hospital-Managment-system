// login.service.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

class LoginService {
  constructor(jwtSecret) {
    this.jwtSecret = jwtSecret;
  }

  async authenticateUser({ email, password }) {
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      throw new Error('User not found');
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { email: userDoc.email, id: userDoc._id },
      this.jwtSecret,
      {}
    );

    return { userDoc, token };
  }
}

module.exports = LoginService;