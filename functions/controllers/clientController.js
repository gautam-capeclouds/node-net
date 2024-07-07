const Client = require('../models/Client');

exports.getUserTitle = async (req, res) => {
  const title = req.query.title;
  
  if (!title) {
    return res.status(400).json({ status: 'error', message: 'Title parameter is missing' });
  }

  try {
    const userDetail = await Client.findOne({ title: title });
    
    if (userDetail) {
      userDetail._id = userDetail._id.toString();  // Convert ObjectId to string
      return res.status(200).json({ status: 'success', data: userDetail });
    } else {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.getUserDetailsByUsername = async (req, res) => {
  const username = req.query.username;
  
  if (!username) {
    return res.status(400).json({ message: 'Missing username parameter' });
  }

  try {
    const userDetails = await Client.find({ title: username });
    const userdetailSerialized = userDetails.map(user => {
      user._id = user._id.toString();  // Convert ObjectId to string
      return user;
    });

    if (userdetailSerialized.length === 0) {
      return res.status(404).json({ message: 'No matching user details found' });
    }

    return res.status(200).json({ data: userdetailSerialized });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
