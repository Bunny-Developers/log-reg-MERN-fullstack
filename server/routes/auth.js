const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

//register
router.post('/logreg', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Check if User already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists'});
    }

    // Create new User
    user = new User({name, enail, password });
    await user.save();

    //Generate JWT token
    const payload = { user: { id: user.id } };
    consttoken = jwt.sign(payload. process.env.JWT_SECRET || 'fallbackSeceret', {
      expiresIn: '5h'
    });
    res.status(201).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

//Login
router.post('/logreg', async (req, res ) => {
  try {
    const {email, password } = req.body;

    // Check if user exists
    let user = await User.findOne
    ({ email });
    if (!user) {
      return res.status(400).json( { message: 'Invalid Credentials' });
    }

    //Check password
  }
})