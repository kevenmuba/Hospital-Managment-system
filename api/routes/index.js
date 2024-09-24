// Import the express module 
const express = require('express');
// Call the router method from express to create the router 
const router = express.Router();
// register route
const registerRoute = require('./register.routes')
// login route
const loginRoute = require('./login.routes')
// profile route
const profileRoute = require('./profile.route')
router.use(registerRoute)
router.use(loginRoute)
router.use(profileRoute)


// Export the router
module.exports = router; 