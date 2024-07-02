const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/get_user_title', clientController.getUserTitle);
router.get('/registerDetailsUsername', clientController.getUserDetailsByUsername);

module.exports = router;
