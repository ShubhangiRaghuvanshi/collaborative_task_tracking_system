const User= require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({
      name,
      email,
      password
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
}
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    };
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    res.status(200).json({ message: 'Login successful', token });
  }
  catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  } };
const updateUserProfile = async (req, res) => {
    const { name, email,password } = req.body;
    const userId = req.user.id; 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if(name) user.name = name;
    if(email) user.email = email;
    if(password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    }   
    await user.save();
    res.status(200).json({ message: 'User profile updated successfully' });
}

const fetchUserProfile = async (req, res) => {
    const userId = req.user.id; 
    const user = await User.findById(userId).select('-password'); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  };




  module.exports = {
    registerUser,
    loginUser,
    updateUserProfile,
    fetchUserProfile
  };