// register.controller.js
const RegisterService = require('../services/register.service');

class RegisterController {
  constructor(jwtSecret) {
    this.registerService = new RegisterService(jwtSecret);
  }

  async register(req, res) {
    const { name, email, password } = req.body;

    try {
      const { userDoc, token } = await this.registerService.registerUser({ name, email, password });
      res.status(201).json({ user: userDoc, token }); // Send back user document and token with a 201 status
    } catch (e) {
      res.status(422).json({ error: e.message }); // Send back error message with a 422 status
    }
  }
}

module.exports = RegisterController;