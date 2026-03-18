const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    type: { // Corresponds to HTML form "issue-type"
        type: String,
        required: [true, 'Please add an issue category'],
        enum: ['road', 'sanitation', 'parks', 'safety', 'utilities', 'other']
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    details: {
        type: String,
        required: [true, 'Please add details'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    images: {
        type: [String], // Array of URLs or local paths
        validate: [arrayLimit, 'Exceeds the limit of 5 photos']
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved'],
        default: 'Pending'
    },
    votes: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

function arrayLimit(val) {
    return val.length <= 5;
}

module.exports = mongoose.model('Complaint', complaintSchema);
