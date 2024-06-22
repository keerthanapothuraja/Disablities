
const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    phoneNo: { type: String, required: true },
    resume: { type: String, required: true } // Store the file path of the uploaded resume
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);

