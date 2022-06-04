// const User = require("../models/userModel");
const User = require("../Schema/schema")
const bcrypt = require("bcrypt");

// module.exports.login = async (req, res, next) => {
//   try {
//     const { fullname, password } = req.body;
//     const user = await User.findOne({ fullname });
//     if (!user)
//       return res.json({ msg: "Incorrect fullname or Password", status: false });
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid)
//       return res.json({ msg: "Incorrect fullname or Password", status: false });
//     delete user.password;
//     return res.json({ status: true, user });
//   } catch (ex) {
//     next(ex);
//   }
// };

// module.exports.register = async (req, res, next) => {
//   try {
//     const { fullname, email, password } = req.body;
//     const usernameCheck = await User.findOne({ fullname });
//     // console.log("usernameCheck",req.body)
//     if (usernameCheck)
//       return res.json({ msg: "Username already used", status: false });
//     const emailCheck = await User.findOne({ email });
//     if (emailCheck)
//       return res.json({ msg: "Email already used", status: false });
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       email,
//       fullname,
//       password: hashedPassword,
//     });
//     delete user.password;
//     return res.json({ status: true, user });
//   } catch (ex) {
//     next(ex);
//   }
// };

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "fullname",
      // "avatarImage",
      "_id",
    ]);
    //   console.log(req);
    // const users=await User.find({_id:req.params.id})
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};
// module.exports.gettedUser=async(req,res)=>{
// try {

// } catch (error) {
//   console.log(error)
// }
// }

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
