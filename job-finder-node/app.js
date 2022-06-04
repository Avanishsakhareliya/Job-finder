const express = require("express");
require("./src/Connection/connect")
const app = express();
const router = express.Router()
var cors = require('cors')
const socket = require("socket.io");
app.use(express.json({limit:'50mb'}))
app.use(cors())

const PORT = process.env.PORT || 4000;

const signup_data=require('./src/Api/Signup')
const login_data=require('./src/Api/Login')
const jobdata=require('./src/Api/jobdata')
const submitUserData=require('./src/Api/Submituserdetail')
const watchlist=require('./src/Api/Whatchlist')

const Profile=require('./src/Api/Profile')
const {
    getAllUsers,
    setAvatar,
    logOut,
} = require('./src/controllers/userController');
const { addMessage, getMessages } = require("./src/controllers/messageController");

app.get("/", (req, res) => {
    res.send("hello")
})
//------------for chating-------------
app.get("/api/auth/allusers/:id", getAllUsers);
app.post("/api/auth/setavatar/:id", setAvatar);
app.get("/api/auth/logout/:id", logOut);
app.post("/api/messages/addmsg/", addMessage);
app.post("/api/messages/getmsg/", getMessages);
//-----------------------------------

//watchlist

app.post("/api/addwatchlist", watchlist.addJobWatchlist);
app.get("/api/getJobWatchkist/:Id", watchlist.getJobWatchkist);
app.delete('/api/deleteJobWatchkist',watchlist.DeleteJobWatchkist);
//

app.post("/api/signup",signup_data.signup)
app.post("/api/login",login_data.login)
app.post('/api/addjob',jobdata.addJobdata)
app.get('/api/getUser/:id',login_data.getUser)
app.get('/api/getjobdata',jobdata.getJobdata)
app.get('/api/getDescjobdata',jobdata.addDescJobdata)
app.get('/api/getjobdataById/:jobId',jobdata.getjobdataById)
app.post('/api/addsubmitUserDetails',submitUserData.addJobUserDetails)
app.get('/api/getsubmituserdetails/:submitUserId',submitUserData.getSubmitUserdata)
app.get('/api/getnotifiyuserdetails/:UserId',submitUserData.getnotifiyuserdetails)
app.post('/api/deleteNotification/:id',submitUserData.deleteNotifiyuser)
app.post('/api/offerappli/:id',submitUserData.offerAppli)
app.get('/api/userNotification/:id',submitUserData.userNotification)
app.post('/api/deleteUserNotification/:id',submitUserData.deleteUserNotifiyuser)
app.get('/api/userViewJobOffer/:id',submitUserData.userViewJobOffer)
app.post('/api/deleteuserViewJobOffer/:id',submitUserData.deleteuserViewJobOffer)
app.get('/api/getJobOffer/:id',submitUserData.getJobOffer)
app.post('/api/viewAcceptOffer/:id',submitUserData.viewOfferAppli)



app.get('/api/getEmployerChatData/:UserId',submitUserData.getEmployerChatData)
app.get('/api/getJobseekerChatData/:UserId',submitUserData.getJobseekerChatData)


app.post('/api/addprofileuserdetails/:id',signup_data.addprofileuser)
app.post('/api/accountuser/:id',signup_data.getAccountUser)
app.post('/api/deleteAccount/:id',signup_data.setdeleteAccout)
app.post('/api/setHideprofile/:id',signup_data.setHideprofile)
app.post('/api/userprofile/:id',Profile.Profileuserdata)
app.get('/api/getuserprofile/:id',Profile.getuserprofiledata)

//jobseeker
app.get('/api/getPostJoblist/:seekerId',jobdata.getPostJoblist)
app.get('/api/getUserSubmitJobDetail/:seekerId',submitUserData.getUserSubmitJobDetail)
app.get('/api/getJobprofile/:seekerId',Profile.getJobprofile)

//Employer
app.post("/api/setEmployerAccout",signup_data.setEmployerAccout)


// app.listen(PORT, () => {
//     console.log(`server start on port ${PORT}`);
// })

const server=app.listen(PORT, () => {
    console.log(`server start on port ${PORT}`);
})

// const server = app.listen(process.env.PORT, () =>
//     console.log(`Server started on ${process.env.PORT}`)
// );
const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    });
});