const mongoose = require("mongoose");

const signup_struct = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    mobileNumber: {
        type: Number,
        max: 10,
    },
     avatarImage: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        enum: {
            values: ['Jobseeker', 'Employer', 'Administrator'],
            message: 'Your error message'
        }
    },
    hideprofile: {
        type: Boolean
    },
    deletAccount: {
        type: Boolean
    },
    currentlocation: {
        type: String,
    },
    currentcity: {
        type: String,
    },
    exactlocation: {
        type: String,
    },
    dateofbirth: {
        type: String,
    },
    employeestatus: {
        type: String,
    },
    changeapplanguage: {
        type: String,
    },
    token: String,
})
signup_struct.set('timestamps', true)

const result = mongoose.model("signup_user_data", signup_struct);

module.exports = result;