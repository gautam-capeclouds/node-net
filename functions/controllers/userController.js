const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { firstName: 1, lname: 1, title: 1, email: 1, address: 1, _id: 0 });
    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.insertUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing required fields: username, password' });
  }

  const user = new User({ username, password });

  try {
    await user.save();
    return res.status(201).json({ message: 'User created successfully', data: { id: user._id } });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to insert user' });
  }
};
