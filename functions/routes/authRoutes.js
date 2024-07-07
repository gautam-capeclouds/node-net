const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.post('/token', authController.createToken);
router.post('/check_token', jwtMiddleware, authController.checkToken);
router.get('/protected', jwtMiddleware, authController.protected);

module.exports = router;
