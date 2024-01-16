const express = require('express');
const router = express.Router();
const JobApplication = require('../models/JobApplication');

// POST endpoint to create a new job application
router.post('/api/v1/job-applications', async (req, res) => {
  try {
    const { industry, department, role, video } = req.body;

    // Validate request data
    if (!industry || !department || !role || !video) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new job application
    const newJobApplication = new JobApplication({
      industry,
      department,
      role,
      video,
    });

    // Save the job application to the database
    const savedJobApplication = await newJobApplication.save();

    res.status(201).json(savedJobApplication);
  } catch (error) {
    console.error('Error creating job application:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
