const signup_user_data = require("../Schema/schema")
const TOKEN_KEY = "hellodeveloperforreactjsapp";
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const finduser = await signup_user_data.findOne({ email });
        console.log("finduser", finduser);
        if (finduser) {
            const comper = await bcrypt.compare(password, finduser.password);
            var tokens = jwt.sign({ email,_id:finduser._id }, TOKEN_KEY, {
                expiresIn: 86400 // expires in 24 hours
            });
            finduser.token = tokens

            const saveUser= await finduser.save();
            if (comper && finduser.deletAccount === false) {
                res.status(200).json({ massage: "successfull login", token: finduser.token,finduser:finduser })
            } else {
                res.status(400).json({ massage: "invalid data" })
            }
        }
        else {
            res.status(401).json({ massage: "invalid user" })
        }
    }
    catch (err) {
        console.log(err)
    }


}

exports.getUser=async(req,res)=>{
    try{
        if(req.headers.token){
    const finduser = await signup_user_data.findOne({ _id:req.params.id });
    if(finduser){
        res.status(200).json({ massage: "successfull get data",finduser:finduser})
    }else{
        res.status(400).json({ massage: "invalid data" })
    }
}else{
    res.status(401).json({ message: "user not valid" })

}
    }catch(err){
        console.log('err',err)

    }
       
}