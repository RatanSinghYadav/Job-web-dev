const userDetail = require("../../models/userDetails");
const { body, validationResult } = require('express-validator');
const User = require("../../models/user.js");

const userProfile = async (req, res) => {
  try {
    // Retrieve user details from request
    const id = req.userId;

    // Extract file details from the request files
    const avatar = req.files['avatar'] ? req.files['avatar'][0] : null;
    const video = req.files['video'] ? req.files['video'][0] : null;

    if (!avatar || !video) {
      return res.status(401).json({ message: "Avatar or video is missing", success: false });
    }

    const {
      fname, lname, email, phone,
      educationMode, institution, degree, specialization, eduStartDate, eduEndDate, cgpaOrPercentage, achievement, eduAddMore,
      experienceType, company, designation, role, workExpStartDate, workExpEndDate, currentCTC, achievements, tools, skills, workExpAddMore,
      certificationName, certificationStartDate, certificationEndDate, certificationsAddMore, currentLocation, willingToRelocate, ownVehicle, ownLaptop,
      linkedInId, gitHubId, otherInformation,
    } = req.body;

    // Additional validation using express-validator
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ errors: validationErrors.array(), success: false });
    }

    console.log(
      fname, lname, email, phone, avatar, video,
      educationMode, institution, degree, specialization, eduStartDate, eduEndDate, achievement, cgpaOrPercentage, eduAddMore,
      experienceType, company, designation, role, workExpStartDate, workExpEndDate, currentCTC, achievements, tools, skills, workExpAddMore,
      certificationName, certificationStartDate, certificationEndDate, certificationsAddMore, currentLocation, willingToRelocate, ownVehicle, ownLaptop,
      linkedInId, gitHubId, otherInformation,
    );

    // Update user details in the database
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          fname,
          lname,
          email,
          phone,
        },
      },
      { new: true }
    );

    // Update user details in the userDetail collection
    const updatedUserDetail = await userDetail.findOneAndUpdate(
      { user: id },
      {
        $set: {
          avatar,
          educationMode, institution, degree, specialization, eduStartDate, eduEndDate, cgpaOrPercentage, achievement, eduAddMore,
          experienceType, company, designation, role, workExpStartDate, workExpEndDate, currentCTC, achievements, tools, skills, workExpAddMore,
          certificationName, certificationStartDate, certificationEndDate, certificationsAddMore, currentLocation, willingToRelocate, ownVehicle, ownLaptop,
          linkedInId, gitHubId, otherInformation,
          video,
        },
      },
      { new: true, upsert: true }
    );

    // Check if the user was updated successfully
    if (!updatedUser || !updatedUserDetail) {
      return res.status(404).json({ error: 'User or UserDetail not found', success: false });
    }

    // Return the updated user profile
    res.json({ user: updatedUser, userDetail: updatedUserDetail, success: true });
  } catch (error) {
    console.error('Error in uploading:', error);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};

module.exports = userProfile;
