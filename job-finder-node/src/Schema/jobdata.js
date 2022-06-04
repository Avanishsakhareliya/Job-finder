const mongoose = require("mongoose");

const jobdata = mongoose.Schema({
    jobaddUserId:{type:mongoose.Schema.Types.ObjectId,ref:'signup_user_data'},
    role_name: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true,
    },
    company_video: {
        type: String,
        required: true,
    },
    job_category: {
        type: String,
        required: true,
    },
    jobtitle: {
        type: String,
        required: true,
    },
    job_type: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    job_details: {
        type: String,
        required: true,
    },
    locationUrl: {
        type: String,
        required: true,
    },
    start_jobtime: {
        type: Date,
        default:new Date().toString()
    },
    salary: {
        type: Number,
        required: true,
    },
    postedBy:{
        type: String,
        required: true,
    },
    Education_level:{
        type: String,
        enum: ["Elementary Education", "Intermediate Education","Higher Education",'none']
    },
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    }    
})
jobdata.set('timestamps', true)

const result = mongoose.model("jobdata", jobdata);

module.exports = result;