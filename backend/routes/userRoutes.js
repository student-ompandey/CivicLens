const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
// Expect standard multipart array named "profilePhoto" limit 1
const upload = require('../middleware/uploadMiddleware'); 

const router = express.Router();

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, upload.array('profilePhoto', 1), updateUserProfile);

module.exports = router;
