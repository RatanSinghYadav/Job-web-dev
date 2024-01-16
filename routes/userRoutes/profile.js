const userDetail = require("../../models/userDetails")
const { body, validationResult } = require('express-validator');
const videoResume = require('./videoResume.js');

const userProfile = async (req, res) => {

    const {
        fname, lname, email, phone,
        educationMode, institution, degree, specialization, eduStartDate, eduEndDate, achievement, cgpaOrPercentage, eduAddMore,
        experienceType, company, designation, department, role, workExpStartDate, workExpEndDate, currentCTC, achievments, tools, skills, workExpAddMore,
        certificationName, date, certificationAddMore,
        currentLocation, willingToRelocate, ownVehicle, ownLaptop, linkedInId, gitHubId, otherInformation,

    } = req.body;

    console.log(
        fname, lname, email, phone,
        educationMode, institution, degree, specialization, eduStartDate, eduEndDate, achievement, cgpaOrPercentage, eduAddMore,
        experienceType, company, designation, department, role, workExpStartDate, workExpEndDate, currentCTC, achievments, tools, skills, workExpAddMore,
        certificationName, date, certificationAddMore,
        currentLocation, willingToRelocate, ownVehicle, ownLaptop, linkedInId, gitHubId, otherInformation,

    )


    // Extract file details from the request files
    // const avatar = req.files['avatar'][0].filename;

    // const videoFile = {
    //     title: req.body.videoTitle,
    //     media: req.files['videoFile'][0].filename,
    // };

    
    // Create VideoResume document
    const newVideoResume = new videoResume({
        media: req.files['video'][0].filename,
    });

    const savedVideoResume = await newVideoResume.save();

    const data = new userDetail({
        fname, lname, email, phone,
        // avatar: avatar, 
        educationMode, institution, degree, specialization, eduStartDate, eduEndDate, achievement, cgpaOrPercentage, eduAddMore,
        experienceType, company, designation, department, role, workExpStartDate, workExpEndDate, currentCTC, achievments, tools, skills, workExpAddMore,
        certificationName, date, certificationAddMore,
        currentLocation, willingToRelocate, ownVehicle, ownLaptop, linkedInId, gitHubId, otherInformation,
        savedVideoResume
    })

    const userData = await data.save();

    console.log(userData);

    res.status(201).json({ success: true, message: "user details saved successfully", userData });


    // Input all certificates into array




    try {
    }
    catch (e) {
        console.error('Error in uploading:', e);
        res.json(e)
    }
}

module.exports = userProfile;

