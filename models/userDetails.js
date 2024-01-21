const mongoose = require('mongoose');

const userDetail = mongoose.Schema({
    // Users Detail
    users: {
        fname: String,
        lname: String,
        email: String,
        phone: String,
        currentLocation: String,
    },

    // Education Details
    educationMode: { type: String },
    institution: { type: String, },
    degree: { type: String, },
    specialization: { type: String },
    eduStartDate: { type: String },
    eduEndDate: { type: String },
    cgpaOrPercentage: { type: String },
    achievement: { type: String },
    eduAddMore: { type: Array },

    // Work Experience
    experienceType: { type: String },
    company: { type: String },
    jobDescription: { type: String },
    designation: { type: String },
    role: { type: String },
    workExpStartDate: { type: String },
    workExpEndDate: { type: String },
    currentCTC: { type: String },
    achievements: { type: String },
    tools: { type: Array },
    skills: { type: Array },
    workExpAddMore: { type: Array },

    // Certifications
    certificationName: { type: String },
    certificationStartDate: { type: String },
    certificationEndDate: { type: String },
    certificationsAddMore: { type: Array },

    // Others
    jobLocation: { type: String },
    willingToRelocate: { type: String },
    ownVehicle: { type: String },
    ownLaptop: { type: String },
    linkedInId: { type: String },
    gitHubId: { type: String },
    otherInformation: { type: String },

    // video Resume
    video: { type: mongoose.Schema.Types.Mixed },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
},

    {
        timestamps: true
    }
)

const userDetailModel = new mongoose.model("userDetail", userDetail);

module.exports = userDetailModel;