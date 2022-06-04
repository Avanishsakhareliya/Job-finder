const mongoose = require("mongoose");

const submitUserData = mongoose.Schema({
    jobId: {
        type:mongoose.Schema.Types.ObjectId,ref:'jobdata'
    },
    submitUserId: {
        type:mongoose.Schema.Types.ObjectId,ref:'signup_user_data'
    },
    text: {
        type: String,
        required:true
    },
    file:{
        type: String
    },
    notification:{type: Boolean},
    acceptOffer:{type: Boolean},
    userViewJobOffer:{type: Boolean},
    viewOfferAccept:{type: Boolean}
})
submitUserData.set('timestamps', true)

const result = mongoose.model("submitUserData", submitUserData);

module.exports = result;