const userDetail = require("../../models/userDetails");
const { body, validationResult } = require('express-validator');
const User = require("../../models/user.js");

const userProfile = async (req, res) => {
  try {
    // Retrieve user details from request
    const id = req.userId;

    // Extract file details from the request files
    // const avatar = req.files['avatar'] ? req.files['avatar'][0] : null;
    // const video = req.files['video'] ? req.files['video'][0] : null;


    const {
      educationMode, institution, degree, specialization, eduStartDate, eduEndDate, cgpaOrPercentage, achievement, eduAddMore,
      experienceType, company, jobDescription, designation, role, workExpStartDate, workExpEndDate, currentCTC, achievements, tools, skills, workExpAddMore,
      certificationName, certificationStartDate, certificationEndDate, certificationsAddMore, jobLocation, willingToRelocate, ownVehicle, ownLaptop,
      linkedInId, gitHubId, otherInformation,
    } = req.body;

    // Additional validation using express-validator
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ errors: validationErrors.array(), success: false });
    }

    console.log(
      educationMode, institution, degree, specialization, eduStartDate, eduEndDate, achievement, cgpaOrPercentage, eduAddMore,
      experienceType, company, designation, role, workExpStartDate, workExpEndDate, currentCTC, achievements, tools, skills, workExpAddMore,
      certificationName, certificationStartDate, certificationEndDate, certificationsAddMore, jobLocation, willingToRelocate, ownVehicle, ownLaptop,
      linkedInId, gitHubId, otherInformation
    );

    const updatedUser = await User.findById(id);

    // Update user details in the userDetail collection
    const updatedUserDetail = await userDetail.findOneAndUpdate(
      { user: id },
      {
        $set: {
          educationMode, institution, degree, specialization, eduStartDate, eduEndDate, cgpaOrPercentage, achievement, eduAddMore,
          experienceType, company, jobDescription, designation, role, workExpStartDate, workExpEndDate, currentCTC, achievements, tools, skills, workExpAddMore,
          certificationName, certificationStartDate, certificationEndDate, certificationsAddMore, jobLocation, willingToRelocate, ownVehicle, ownLaptop,
          linkedInId, gitHubId, otherInformation,
        },
      },
      { new: true, upsert: true }
    );

    // Associate userDetail with users model
    updatedUser.userDetail = updatedUserDetail._id;
    await updatedUser.save();

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

const updateUserShortDetail = async (req, res) => {
  try {
    // Retrieve user details from request
    const id = req.userId;

    const { fname, lname, email, number, currentLocation } = req.body;

    // Additional validation using express-validator
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ errors: validationErrors.array(), success: false });
    }

    // Update user details in the database
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        fname,
        lname,
        email,
        number,
        currentLocation,
      },
      { new: true }
    );
    // await updatedUser.save();

    // Check if the user was updated successfully
    if (!updatedUser) {
      return res.status(404).json({ error: 'User or UserDetail not found', success: false });
    }

    // Return the updated user profile
    res.json({ user: updatedUser, message: "user update successfully", success: true });
  } catch (error) {
    console.error('Error in uploading:', error);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};


const getUserData = async (req, res) => {
  try {
    const id = req.userId;
    const user = await User.findById(id);
    // console.log(user);
    res.json({ user: user, message: "user found successfully", success: true });

  } catch (error) {
    console.error('Error in from getData:', error);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
}

const getUserDetail = async (req, res) => {
  try {

    const id = req.userId;
    const user = await User.findById(id);
    const userDataWithDetail = await User.findById(id).populate('userDetail',
      `educationMode institution degree specialization eduStartDate eduEndDate cgpaOrPercentage achievement eduAddMore
     experienceType company designation role, workExpStartDate workExpEndDate currentCTC achievements tools skills workExpAddMore
    certificationName certificationStartDate certificationEndDate certificationsAddMore jobLocation willingToRelocate ownVehicle ownLaptop
    linkedInId gitHubId otherInformation`
    );

    // console.log(userDataWithDetail);

    res.json({ user: userDataWithDetail, message: "user found successfully", success: true });

    // const id = req.userId;
    // const fetchUserDetail = await userDetail.findById(id);
    // const userDataWithDetail = await User.findById(id).populate('userDetail');

    // console.log(userDataWithDetail);

    // res.json({ user: userDataWithDetail, message: "user found successfully", success: true });
    // console.log(userDetail);
    // res.json({ userDetail: userDetail, message:"userDetail found successfully", success: true });

  } catch (error) {
    console.error('Error in from getData:', error);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
}

const userImageUpload = async (req, res) => {
  try {
    const id = req.userId;

    console.log(id)

    // Extract file details from the request files
    const avatar = req.files['avatar'] ? req.files['avatar'][0] : null;
    // console.log(avatar);

    if (!avatar) {
      return res.status(401).json({ message: "Avatar or video is missing", success: false });
    }

    const data = await User.findByIdAndUpdate(id, {
      avatar: avatar.filename,
    },
      { new: true }
    );

    res.json({ user: data, message: "image upload successfully", success: true });

  } catch (error) {
    console.error('Error in from getData:', error);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
}

module.exports = { userProfile, getUserData, userImageUpload, getUserDetail, updateUserShortDetail };
