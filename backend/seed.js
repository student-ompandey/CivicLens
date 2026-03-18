const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Complaint = require('./models/Complaint');

// Load environment variables
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

const issues = [
  {
    type: 'road',
    title: 'Severe Pothole on Maple Street',
    location: '400 Block of Maple St.',
    details: 'There is a severe pothole spanning across the right lane. Multiple cars have experienced tire damage over the last 48 hours. Urgent repair needed before an accident occurs.',
    status: 'Pending',
    votes: 42,
    images: ['https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80']
  },
  {
    type: 'safety',
    title: 'Broken Streetlight at Pedestrian Crossing',
    location: 'Intersection of Oak and 5th Ave',
    details: 'The main streetlight directly above the crosswalk has been out for a week. This intersection is very dangerous at night for pedestrians returning from the nearby transit stop.',
    status: 'In Progress',
    votes: 115,
    images: ['https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?auto=format&fit=crop&w=800&q=80']
  },
  {
    type: 'sanitation',
    title: 'Illegal Dumping Blocking Alleyway',
    location: 'Alley behind Westside Market',
    details: 'A large pile of construction debris and old furniture was dumped blocking the entire rear alley access. It is creating a severe sanitation hazard and blocking delivery trucks.',
    status: 'Pending',
    votes: 28,
    images: ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80']
  },
  {
    type: 'parks',
    title: 'Park Playground Equipment Damaged',
    location: 'Centennial Park South Entrance',
    details: 'The main slide structure at the south entrance has a broken railing and sharp exposed metal. It has been taped off but children are still playing near it.',
    status: 'Resolved',
    votes: 89,
    images: ['https://images.unsplash.com/photo-1596423735880-5f2a689b903e?auto=format&fit=crop&w=800&q=80']
  },
  {
    type: 'utilities',
    title: 'Water Main Leak Flooding Sidewalk',
    location: '720 Riverside Drive',
    details: 'There is a constant stream of water bubbling up from the sidewalk concrete joint. It has been flowing for over 2 days and is starting to erode the adjacent soil embankment.',
    status: 'In Progress',
    votes: 67,
    images: ['https://images.unsplash.com/photo-1580227916568-15cf47b713bf?auto=format&fit=crop&w=800&q=80']
  }
];

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Complaint.deleteMany();

        // Check if our official 'System Admin' user exists
        let adminUser = await User.findOne({ email: 'admin@civiclens.com' });
        
        if (!adminUser) {
            adminUser = await User.create({
                name: 'City Council',
                email: 'admin@civiclens.com',
                password: 'securepassword123',
                role: 'admin'
            });
        }

        // Attach user ID to issues and insert
        const issuesWithUser = issues.map(issue => {
            return { ...issue, user: adminUser._id };
        });

        await Complaint.insertMany(issuesWithUser);

        console.log('Dummy Issues Successfully Inserted!');
        process.exit();
    } catch (error) {
        console.error('Seeding Error:', error);
        process.exit(1);
    }
};

seedData();
