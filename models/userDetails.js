const mongoose = require('mongoose');

const userDetail = mongoose.Schema({
    // Users Detail
    users: {
        fname: String,
        lname: String,
        email: String,
        phone: String,
    },

    avatar: { type: String },

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
    designation: { type: String },
    department: { type: String },
    role: { type: String },
    workExpStartDate: { type: String },
    workExpEndDate: { type: String },
    currentCTC: { type: String },
    achievements: { type: String },
    tools: { type: String },
    skills: { type: Array },
    workExpAddMore: { type: Array },

    // Certifications
    certificationName: { type: String },
    date: { type: Date },
    certificationsAddMore: { type: Array },

    // Others
    currentLocation: { type: String },
    willingToRelocate: { type: String },
    ownVehicle: { type: String },
    ownLaptop: { type: String },
    linkedInId: { type: String },
    gitHubId: { type: String },
    otherInformation: { type: String },

    // video Resume
    videoResume: { type: String },
},
    {
        timestamps: true
    }
)

const userDetailModel = new mongoose.model("userDetail", userDetail);

module.exports = userDetailModel;