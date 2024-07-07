require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const serverless = require('serverless-http');

const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const cloudinary = require('../utils/cloudinary');

// const authRoutes = require('../routes/authRoutes');
// const categoryRoutes = require('../routes/categoryRoutes');
// const userRoutes = require('../routes/userRoutes');
// const serviceRoutes = require('../routes/serviceRoutes');
// const clientRoutes = require('../routes/clientRoutes');
// const gautamRoutes = require('../routes/gautamRoutes');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// app.use('/api/auth', authRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/services', serviceRoutes);
// app.use('/api', clientRoutes);
// // app.use('/check', gautamRoutes);
app.get('/gau', (req, res) => {
  res.send('Hello Gautam check');
});


const PORT = process.env.PORT || 8887;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = serverless(app);
