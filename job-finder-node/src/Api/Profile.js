const profiledata = require('../Schema/Profile')
const signup_user_data = require("../Schema/schema")

exports.Profileuserdata = async (req, res) => {
    try {
        // console.log("req-----",req.body.desiredsalary)
        // if (req.headers.token) {
        const findUser = await profiledata.findOne({ UserprofileId: req.params.id });
        if (findUser) {
            let result = await profiledata.findOneAndUpdate({ UserprofileId: req.params.id }, {
                profileImg: req.body.img,
                UserprofileId: req.params.id,
                interest: req.body.interest,
                description: req.body.description,
                jobrequirement: req.body.jobrequirement,
                desiredsalary: req.body.desiredsalary,
                Locationinterest: req.body.Locationinterest,
                professionalskills: req.body.ProfessionalSkill,
                Language: req.body.Language,
                schedulepreference: req.body.SchedulePreference
            })
            if (result) {
                res.status(200).json({ massage: "successfull update user profile", data: result })
            }else{
                console.log("error of update user");
            }
        }
        else {
            console.log("error of create user");

            let result2 = await profiledata.create({
                profileImg: req.body.img,
                UserprofileId: req.params.id,
                interest: req.body.interest,
                description: req.body.description,
                jobrequirement: req.body.jobrequirement,
                desiredsalary: req.body.desiredsalary,
                Locationinterest: req.body.Locationinterest,
                professionalskills: req.body.ProfessionalSkill,
                Language: req.body.Language,
                schedulepreference: req.body.SchedulePreference
            })

            const saveProfile = await result2.save()
            if (saveProfile) {
                res.status(200).json({ massage: "successfull create user profile", data: saveProfile })
            }else{
                console.log("error of create user");

            }
        }

    } catch (err) {
        console.log('err===>', err)
    }
}

exports.getuserprofiledata = async (req, res) => {
    try {
        const ans = await profiledata.findOne({UserprofileId:req.params.id })

        if(ans){
         res.status(200).json({ message: "done", data: ans })
        }else{
         res.status(400).json({ message: "fail" })
        }

    } catch (error) {
        console.log(error);
    }
}

exports.getJobprofile=async(req, res)=>{
    try {
        if (req.headers.token) {
        const ans = await profiledata.findOne({UserprofileId:req.params.seekerId }).populate("UserprofileId")
        if(ans){
         res.status(200).json({ message: "done", data: ans })
        }else{
         res.status(400).json({ message: "profile is private" })
        }
    }else{
        res.status(401).json({ message: "user not valid" })
    }

    } catch (error) {
        console.log(error);
    }
}
