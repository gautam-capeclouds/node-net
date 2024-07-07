const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.createToken = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  
  if (user) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    return res.status(200).json({ access_token: token, username });
  } else {
    return res.status(401).json({ msg: 'Bad username or password' });
  }
};

exports.checkToken = (req, res) => {
  try {
    const currentUser = req.user;
    return res.status(200).json({ valid: true });
  } catch (e) {
    return res.status(200).json({ valid: false });
  }
};

exports.protected = (req, res) => {
  const currentUser = req.user;
  return res.status(200).json({ logged_in_as: currentUser });
};
