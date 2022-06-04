const jobdata=require('../Schema/jobdata')
const signup_user_data = require("../Schema/schema")

exports.addJobdata=async(req,res)=>{
    try{
        if(req.headers.token){
        // const {role_name,jobaddUserId,company_name}=req.body
         const findUser=await signup_user_data.find({_id:req.body.jobaddUserId});
         if(findUser){
             const postJob=await jobdata.create({...req.body})
             const saveJob=await postJob.save()
             if(saveJob){
                 res.status(200).json({msg:'success job added'})
             }else{
                res.status(400).json({msg:'somthing wrong details'})
             }
         }else{
            res.status(401).json({msg:'user not found'})
         }
        }else{
            res.status(401).json({msg:'user not found'})
        }
    }catch(err){
 console.log('err===>',err)
    }

}
exports.addDescJobdata=async(req,res)=>{
    try{
        if(req.headers.token){
         const getJobdata=await jobdata.find().sort({"createdAt": 1});
         if(getJobdata){
             res.status(200).json({msg:'successfull get data',getJobdata})
         }else{
            res.status(400).json({msg:'somthing wrong'})
         }
        }else{
            res.status(401).json({msg:'user not found'})
        }
    }catch(err){
 console.log('err===>',err)
    }
}

exports.getJobdata=async(req,res)=>{
    try{
        if(req.headers.token){
         const getJobdata=await jobdata.find().sort({"createdAt": -1});
         if(getJobdata){
             res.status(200).json({msg:'successfull get data',getJobdata})
         }else{
            res.status(400).json({msg:'somthing wrong'})
         }
        }else{
            res.status(401).json({msg:'user not found'})
        }
    }catch(err){
 console.log('err===>',err)
    }
}

exports.getjobdataById=async(req,res)=>{
    try{
        if(req.headers.token){
         const getJobdata=await jobdata.find({_id:req.params.jobId})
         if(getJobdata){
             res.status(200).json({msg:'successfull get data',getJobdata})
         }else{
            res.status(400).json({msg:'somthing wrong'})
         }
        }else{
            res.status(401).json({msg:'user not found'})
        }
    }catch(err){
 console.log('err===>',err)
    }
}

exports.getPostJoblist=async(req,res)=>{
    try{
        if(req.headers.token){
         const getJobdata=await jobdata.find({jobaddUserId:req.params.seekerId})
         if(getJobdata){
             res.status(200).json({msg:'successfull get data',getJobdata})
         }else{
            res.status(400).json({msg:'somthing wrong'})
         }
        }else{
            res.status(401).json({msg:'user not found'})
        }
    }catch(err){
 console.log('err===>',err)
    }
}

