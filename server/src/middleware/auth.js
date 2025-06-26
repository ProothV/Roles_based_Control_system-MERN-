const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token received:', token); // Debug
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Debug
    req.user = decoded; // { userId, roleId }
    next();
  } catch (err) {
    console.error('Token verification error:', err.message); // Debug
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;