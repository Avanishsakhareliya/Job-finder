const mongoose = require("mongoose");

const url=process.env.MONGOURL||'mongodb+srv://job1234:job1234@cluster0.momrp.mongodb.net/jobusers?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("conection is ok");
    })
    .catch((err) => {

        console.log(err);
    });