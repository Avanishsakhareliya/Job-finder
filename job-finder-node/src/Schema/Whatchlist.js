const mongoose = require("mongoose");

const watchlist = mongoose.Schema({
    jobId: {
        type:mongoose.Schema.Types.ObjectId,ref:'jobdata'
    },
    AddUserId: {
        type:mongoose.Schema.Types.ObjectId,ref:'signup_user_data'
    }
})
watchlist.set('timestamps', true)

const result = mongoose.model("watchlist", watchlist);

module.exports = result;