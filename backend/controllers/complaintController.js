const Complaint = require('../models/Complaint');

// @desc    Get all public complaints
// @route   GET /api/complaints
// @access  Public
exports.getComplaints = async (req, res, next) => {
    try {
        const complaints = await Complaint.find()
            .populate('user', 'name')
            .sort('-createdAt'); // Latest first
        res.status(200).json({ success: true, count: complaints.length, data: complaints });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single user complaints
// @route   GET /api/complaints/me
// @access  Private
exports.getMyComplaints = async (req, res, next) => {
    try {
        const complaints = await Complaint.find({ user: req.user.id }).sort('-createdAt');
        res.status(200).json({ success: true, count: complaints.length, data: complaints });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new complaint
// @route   POST /api/complaints
// @access  Private
exports.createComplaint = async (req, res, next) => {
    try {
        // Handle images array mapping if files were uploaded via multer
        let imagePaths = [];
        if (req.files && req.files.length > 0) {
            imagePaths = req.files.map(file => `/uploads/${file.filename}`);
        }

        const complaint = await Complaint.create({
            user: req.user.id,
            type: req.body.type,
            title: req.body.title,
            location: req.body.location,
            details: req.body.details,
            images: imagePaths
        });

        res.status(201).json({ success: true, data: complaint });
    } catch (error) {
        next(error);
    }
};

// @desc    Update complaint status
// @route   PATCH /api/complaints/:id/status
// @access  Private/Admin
exports.updateComplaintStatus = async (req, res, next) => {
    try {
        let complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ success: false, error: 'Complaint not found' });
        }

        complaint.status = req.body.status;
        await complaint.save();

        res.status(200).json({ success: true, data: complaint });
    } catch (error) {
        next(error);
    }
};

// @desc    Upvote a complaint
// @route   PUT /api/complaints/:id/vote
// @access  Private
exports.upvoteComplaint = async (req, res, next) => {
    try {
        const complaint = await Complaint.findByIdAndUpdate(
            req.params.id, 
            { $inc: { votes: 1 } }, 
            { new: true, runValidators: true }
        );

        if (!complaint) {
            return res.status(404).json({ success: false, error: 'Complaint not found' });
        }

        res.status(200).json({ success: true, data: complaint });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a complaint
// @route   DELETE /api/complaints/:id
// @access  Private (Owner or Admin)
exports.deleteComplaint = async (req, res, next) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ success: false, error: 'Complaint not found' });
        }

        // Make sure user owns complaint or is admin
        if (complaint.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, error: 'Not authorized to delete this complaint' });
        }

        await complaint.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};
