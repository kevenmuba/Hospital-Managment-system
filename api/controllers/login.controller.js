// login.controller.js
const LoginService = require('../services/login.service');

class LoginController {
  constructor(jwtSecret) {
    this.loginService = new LoginService(jwtSecret);
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const { userDoc, token } = await this.loginService.authenticateUser({ email, password });
      res.cookie('token', token).json(userDoc); // Set cookie and send user document
    } catch (e) {
      if (e.message === 'User not found') {
        return res.status(404).json('User not found');
      }
      if (e.message === 'Invalid password') {
        return res.status(422).json('Invalid password');
      }
      res.status(500).json({ error: e.message }); // Handle unexpected errors
    }
  }

  logout(req, res) {
    res.cookie('token', '').json(true); // Clear the token cookie
  }
}

module.exports = LoginController;