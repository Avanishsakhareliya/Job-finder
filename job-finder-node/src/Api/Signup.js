const signup_user_data = require("../Schema/schema")
const TOKEN_KEY = "hellodeveloperforreactjsapp";
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
// const fast2sms = require('fast-two-sms')

exports.signup = async (req, res) => {
    
        try {
            const { fullname, email, password } = req.body
            // var options = {
            //     authorization: "QX2kNwqoMF6fug4nGYzDr1bpihcd50WA97U8sITCHOyKJBxltmI36EZtC824NAPSqWhz50pvOdxkGi9m",
            //     message: 'OTP is 123 ', numbers: [mobileNumber]
            // }

            console.log("email", email);
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if (email.match(validRegex)) {
                console.log("Valid email address!");

                let user_email = await signup_user_data.findOne({ email });

                if (user_email) {
                    return res.status(405).json({ massage: 'User with the provided email already exist.' });
                }
                else {
                    if (password) {
                        const saltRounds = 10;
                        const pass = await bcrypt.hash(password, saltRounds);
                        var tokens = jwt.sign({ email }, TOKEN_KEY, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        
                        const userdata = await signup_user_data.create({
                            fullname: fullname, email: email, password: pass, mobileNumber: "", token: tokens,role:"Jobseeker",hideprofile:false,deletAccount:false
                        })
                       await userdata.save();
                       var tokens = jwt.sign({ email,_id:userdata._id }, TOKEN_KEY, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    const saveData= userdata.token = tokens
                    await userdata.save()
                        if(saveData){
                            res.status(200).json({ massage: 'sucessfull massage.', userdata})
                        }else{
                            res.status(400).json({ massage: 'invalid  ! please enter valid.' });
                        }
                    }
                }
            }
            else {
                console.log("Invalid email address!");
                return res.status(403).json({ massage: 'invalid email address ! please enter valid.' });
            }
        }
        catch (err
        ) {
            console.log(err)
        }

}

exports.addprofileuser = async (req, res) => {
    try {
        // console.log("req-------",req);
        const { username, currentlocation, currentcity, exactlocation, dateofbirth, employeestatus, changeapplanguage } = req.body
        const result = await signup_user_data.findOneAndUpdate({ _id: req.params.id }, {
            fullname: username,
            currentlocation: currentlocation,
            currentcity: currentcity,
            exactlocation: exactlocation,
            dateofbirth: dateofbirth,
            employeestatus: employeestatus,
            changeapplanguage: changeapplanguage
        })
        // console.log(result);
        if (result) {
            res.status(200).json({ message: "successfuuly update profile", data: result })
        }
        else {
            res.json({ message: "somthing went wrong" })
        }
    } catch (error) {
        console.log(error);
    }
}

exports.getAccountUser = async (req, res) => {
try {
const { fullname, email, mobileNumber,password } = req.body
if(password){
    const saltRounds = 10;
                        const pass = await bcrypt.hash(password, saltRounds);
const data = await signup_user_data.findOneAndUpdate({ _id: req.params.id }, {
    fullname: fullname,
    email: email,
    mobileNumber: mobileNumber,
    password:pass
})

if (data) {
    res.status(200).json({ message: "done", data: data })
} else {
    res.json({ message: "somthing went wrong" })
}
}else{

    const data = await signup_user_data.findOneAndUpdate({ _id: req.params.id }, {
        fullname: fullname,
        email: email, 
        mobileNumber: mobileNumber,
    })
    
    if (data) {
        res.status(200).json({ message: "done", data: data })
    } else {
        res.json({ message: "somthing went wrong" })
    }
}
} catch (error) {
console.log(error);
}
}


exports.setHideprofile=async(req,res)=>{
    try{
        if (req.headers.token) {
const updateProfile=await signup_user_data.findByIdAndUpdate({_id:req.params.id},req.body)
if(updateProfile){
    res.status(200).json({ message: "Update hideprofile done",data:updateProfile })

} else {
    res.json({ message: "somthing went wrong" })
}
        }else{
        res.status(401).json({ message: "user not valid" })
    }

    }catch(err){
        console.log(err);

    }
}

exports.setdeleteAccout=async(req,res)=>{
    try{
        if (req.headers.token) {
const updateProfile=await signup_user_data.findByIdAndUpdate({_id:req.params.id},req.body)
if(updateProfile){
    res.status(200).json({ message: "done delete account" })

} else {
    res.json({ message: "somthing went wrong" })
}
        }else{
        res.status(401).json({ message: "user not valid" })
    }

    }catch(err){
        console.log(err);

    }
}

exports.setEmployerAccout=async(req,res)=>{
    try {
        const { fullname, email, password } = req.body

        console.log("email", email);
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (email.match(validRegex)) {
            console.log("Valid email address!");

            let user_email = await signup_user_data.findOne({ email });

            if (user_email) {
                return res.status(405).json({ massage: 'User with the provided email already exist.' });
            }
            else {
                if (password) {
                    const saltRounds = 10;
                    const pass = await bcrypt.hash(password, saltRounds);
                    var tokens = jwt.sign({ email }, TOKEN_KEY, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    const userdata = await signup_user_data.create({
                        fullname: fullname, email: email, password: pass, mobileNumber: "", token: tokens,role:"Employer",hideprofile:false,deletAccount:false
                    })
                   await userdata.save();
                   var tokens = jwt.sign({ email,_id:userdata._id }, TOKEN_KEY, {
                    expiresIn: 86400 // expires in 24 hours
                });
                const saveData= userdata.token = tokens
                await userdata.save()
                    if(saveData){
                        res.status(200).json({ massage: 'sucessfull massage.', userdata})
                    }else{
                        res.status(400).json({ massage: 'invalid  ! please enter valid.' });
                    }
                }
            }
        }
        else {
            console.log("Invalid email address!");
            return res.status(403).json({ massage: 'invalid email address ! please enter valid.' });
        }
    }
    catch (err
    ) {
        console.log(err)
    }
}