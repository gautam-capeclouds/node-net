const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  firstName: String,
  lName: String,
  serviceType: String,
  title: String,
  service_description: String,
  phone: String,
  address: String,
  insta: String,
  fb: String,
  twitter: String,
  whatsapp: String,
  profile_picture: String,
  cover_picture: String,
  images: [String],
});

module.exports = mongoose.model('Client', clientSchema);
