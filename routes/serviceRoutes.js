const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', serviceController.getServices);
router.post('/', upload.fields([{ name: 'profilePicture' }, { name: 'coverPicture' }, { name: 'images' }]), serviceController.registerDetails);

module.exports = router;
