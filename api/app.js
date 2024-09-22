const express = require('express');
const cors = require('cors');
const connectDB = require("./db/db");
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app = express();
app.use(express.json());

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


// Start the webserver
app.listen(4000, () => {
  console.log(`Server running on port: ${4000}`);
});