const mongoose = require("mongoose");

const profiledata = mongoose.Schema({
    UserprofileId: { type: mongoose.Schema.Types.ObjectId, ref: 'signup_user_data' },
    profileImg: {
        type: String
    },
    interest: {
        type: String
    },
    jobrequirement: {
        type: String
    },
    desiredsalary: {
        From:{
            type: String
        },
        To:{
            type:String
        }
    },
    Locationinterest: {
        type: String
    },
    professionalskills: {
        type: String
    },
    Language: {
        type: String
    },
    description: {
        type: String
    },
    schedulepreference: {
        type: String
    },



})
profiledata.set('timestamps', true)

const result = mongoose.model("profiledata", profiledata);

module.exports = result;