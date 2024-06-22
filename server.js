const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const JobApplication = require('./models/JobApplication');

const app = express();
const port = process.env.PORT || 3002;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jobApplications', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Route to handle form submission
app.post('/apply', upload.single('resume'), (req, res) => {
    const { username, email, phoneNo } = req.body;
    const resume = req.file.path;

    const newApplication = new JobApplication({
        username,
        email,
        phoneNo,
        resume
    });

    newApplication.save()
        .then(() => res.send('Application submitted successfully'))
        .catch(err => res.status(400).send('Error: ' + err));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
