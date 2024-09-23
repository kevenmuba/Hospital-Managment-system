const express = require('express');
const cors = require('cors');
const connectDB = require("./db/db");
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const jwtSecret = process.env.JWT_SECRET;
const cookieParser = require('cookie-parser');
app.use(express.json());
require('dotenv').config();

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));
// Connect to MongoDB
connectDB();

app.get("/try", (req, res) => {
  res.send(" greate you coonected the nodejs with mongo db ");
});
app.get('/api/test', (req,res) => {
  // mongoose.connect(process.env.MONGO_URL);
  res.json('test ok');
});
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10), // Use a salt value of 10
    });
    res.json(userDoc); // Send back the created user document
  } catch (e) {
    res.status(422).json({ error: e.message }); // Send back error message
  }
});

app.post('/api/login', async (req,res) => {
  // mongoose.connect(process.env.MONGO_URL);
  const {email,password} = req.body;
  const userDoc = await User.findOne({email});
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({
        email:userDoc.email,
        id:userDoc._id
      }, jwtSecret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
      });
    } else {
      res.status(422).json('pass not ok');
    }
  } else {
    res.json('not found');
  }
});

app.get('/api/profile', (req,res) => {
  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const {name,email,_id} = await User.findById(userData.id);
      res.json({name,email,_id});
    });
  } else {
    res.json(null);
  }
});


app.post('/api/logout', (req,res) => {
  res.cookie('token', '').json(true);
});



// Start the webserver
app.listen(4000, () => {
  console.log(`Server running on port: ${4000}`);
});