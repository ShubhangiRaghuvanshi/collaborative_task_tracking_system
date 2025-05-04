const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
 
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
   
    const decoded = jwt.verify(token, secretKey);
    
 
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' });
  }
}

module.exports = authMiddleware;
