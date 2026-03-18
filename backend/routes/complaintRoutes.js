const express = require('express');
const { 
    getComplaints, 
    getMyComplaints,
    createComplaint, 
    updateComplaintStatus,
    upvoteComplaint,
    deleteComplaint
} = require('../controllers/complaintController');

const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.route('/')
    .get(getComplaints)
    .post(protect, upload.array('images', 5), createComplaint);

router.route('/me')
    .get(protect, getMyComplaints);

router.route('/:id')
    .delete(protect, deleteComplaint);

// Admin only status update
router.route('/:id/status')
    .patch(protect, authorize('admin'), updateComplaintStatus);

router.route('/:id/vote')
    .put(protect, upvoteComplaint);

module.exports = router;
