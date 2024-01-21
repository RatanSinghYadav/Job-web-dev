const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    lname: {
        type: String,
        trim: true,
        default: null
    },
    email: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    number: {
        type: String,
        // unique: true,
        default: null,
    },
    password: {
        type: String,
        required: true,
        default: null,
    },
    currentLocation: {
        type: String,
        trim: true,
        default: null,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    avatar: { 
        type: mongoose.Schema.Types.Mixed,
        default:null
     }
    ,
    userDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userDetail',
    }
},
    {
        timestamps: true
    }
)

const users = new mongoose.model("users", userSchema);

module.exports = users;