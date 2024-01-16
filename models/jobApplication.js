const mongoose = require('mongoose');

const jobApplySchema = new mongoose.Schema(
  {
    industry: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    video: {
        type: String,
      },
  },
  {
    timestamps: true, 
  }
);

const JobApplication = mongoose.model('JobApplication', jobApplySchema);

module.exports = JobApplication;
