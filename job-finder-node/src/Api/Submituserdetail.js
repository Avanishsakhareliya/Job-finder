const jobdata=require('../Schema/jobdata')
const signup_user_data = require("../Schema/schema")
const submitUserDetail=require('../Schema/Submituserdetail')
const jwt=require('jsonwebtoken')

exports.addJobUserDetails=async(req,res)=>{
    try{
        if(req.headers.token){
            const decode= jwt.decode(req.headers.token)
        // const {role_name,jobaddUserId,company_name}=req.body
         const findUser=await submitUserDetail.find({_id:req.body.jobId});
         if(findUser.length>0){
             const postJob=await submitUserDetail.findByIdAndUpdate({_id:req.body.jobId},{...req.body,submitUserId:decode.payload._id})
             if(postJob){
                 res.status(200).json({msg:'success jobuser detail added'})
             }else{
                res.status(400).json({msg:'somthing wrong details'})
             }
         }else{
            const decode= jwt.decode(req.headers.token,{complete: true})
            const postJob=await submitUserDetail.create({...req.body,submitUserId:decode.payload._id,notification:true,acceptOffer:false,userViewJobOffer:true,viewOfferAccept:false})
            const saveJob=await postJob.save()
            if(saveJob){
                res.status(200).json({msg:'success jobuser detail added'})
            }else{
               res.status(400).json({msg:'somthing wrong details'})
            }
         }
        }else{
            res.status(401).json({msg:'user not found'})
        }
    }catch(err){
 console.log('err===>',err)
    }
}

exports.getSubmitUserdata = async (req, res) => {
    try {
        // console.log(req.params.submitUserId);
        if (req.headers.token) {
        const result = await submitUserDetail.find({ submitUserId: req.params.submitUserId}).populate("jobId")
        if(result){
         res.status(200).json({ data:result })
        }else{
            res.status(500).json({ msg:'somthing wait worrong' })
        }
        }else{
            res.status(401).json({ msg: 'user not found' })
        }
    } catch (error) {
        console.log(error)
    }
}

exports.getnotifiyuserdetails=async(req,res)=>{
try {
        // console.log(req.params.submitUserId);
        if (req.headers.token) {
        const result = await submitUserDetail.find({notification:true}).populate("jobId").populate("submitUserId");
        const data=result.filter((item)=>(item.jobId.jobaddUserId==req.params.UserId));
        if(data){
         res.status(200).json({ data:data })
        }else{
            res.status(500).json({ msg:'somthing wait worrong' })
        }
        }else{
            res.status(401).json({ msg: 'user not found' })
        }
    } catch (error) {
        console.log(error)
    }
}

exports.deleteNotifiyuser=async(req,res)=>{
    try{
        if (req.headers.token) {
            const postJob=await submitUserDetail.findByIdAndUpdate({_id:req.params.id},{notification:false})
            if(postJob){
                res.status(200).json({msg:'success delete notification'})
               }else{
                   res.status(500).json({ msg:'somthing wait worrong' })
               }
               }else{
                   res.status(401).json({ msg: 'user not found' })
               }
    }catch(err){
        console.log(err)
    }

}

exports.deleteUserNotifiyuser=async(req,res)=>{
    try{
        if (req.headers.token) {
            const postJob=await submitUserDetail.findByIdAndUpdate({_id:req.params.id},{acceptOffer:false})
            if(postJob){
                res.status(200).json({msg:'success delete notification'})
               }else{
                   res.status(500).json({ msg:'somthing wait worrong' })
               }
               }else{
                   res.status(401).json({ msg: 'user not found' })
               }
    }catch(err){
        console.log(err)
    }
}

exports.deleteuserViewJobOffer=async(req,res)=>{
    try{
        if (req.headers.token) {
            const postJob=await submitUserDetail.findByIdAndUpdate({_id:req.params.id},{userViewJobOffer:false})
            if(postJob){
                res.status(200).json({msg:'success delete notification'})
               }else{
                   res.status(500).json({ msg:'somthing wait worrong' })
               }
               }else{
                   res.status(401).json({ msg: 'user not found' })
               }
    }catch(err){
        console.log(err)
    }
}


exports.offerAppli=async(req,res)=>{
    try{
        if (req.headers.token) {
            const findOffer=await submitUserDetail.find({_id:req.params.id,acceptOffer:true})
            if(findOffer.length===0){
            const postJob=await submitUserDetail.findByIdAndUpdate({_id:req.params.id},{acceptOffer:true})
            if(postJob){
                res.status(200).json({msg:'success accept offer'})
               }else{
                   res.status(500).json({ msg:'somthing wait worrong' })
               }
               }else{
                   res.status(403).json({ msg: 'alredy accept offer' })
               }
            }else{
                res.status(401).json({ msg: 'user not found' })
            }
    }catch(err){
        console.log(err)
    }
}

exports.userNotification=async(req,res)=>{
    try{
        if (req.headers.token) {
            const findOffer=await submitUserDetail.find({submitUserId:req.params.id,acceptOffer:true}).populate("jobId").populate("submitUserId");
            if(findOffer){
                res.status(200).json({msg:'success send notification',findOffer})
               }
               else{
                   res.status(403).json({ msg: 'somathing wrrong' })
               }
            }else{
                res.status(401).json({ msg: 'user not found' })
            }
    }catch(err){
        console.log(err)
    }
}

exports.userViewJobOffer=async(req,res)=>{
    try{
        if (req.headers.token) {
            const findOffer=await submitUserDetail.find({submitUserId:req.params.id,acceptOffer:true,userViewJobOffer:true}).populate("jobId").populate("submitUserId");
            if(findOffer){
                res.status(200).json({msg:'success userViewJobOffer',findOffer})
               }
               else{
                   res.status(403).json({ msg: 'somathing wrrong' })
               }
            }else{
                res.status(401).json({ msg: 'user not found' })
            }
    }catch(err){
        console.log(err)
    }
}

exports.getJobOffer=async(req,res)=>{
    try{
        if (req.headers.token) {
            const findOffer=await submitUserDetail.find({_id:req.params.id,userViewJobOffer:true}).populate("jobId").populate("submitUserId");
            if(findOffer){
                res.status(200).json({msg:'success userViewJobOffer',findOffer})
               }
               else{
                   res.status(403).json({ msg: 'somathing wrrong' })
               }
            }else{
                res.status(401).json({ msg: 'user not found' })
            }
    }catch(err){
        console.log(err)
    }
}

exports.getUserSubmitJobDetail=async(req,res)=>{
    try{
        if (req.headers.token) {
            const findOffer=await submitUserDetail.find({jobId:req.params.seekerId}).populate("jobId").populate("submitUserId");
            if(findOffer){
                res.status(200).json({msg:'success send notification',findOffer})
               }
               else{
                   res.status(403).json({ msg: 'somathing wrrong' })
               }
            }else{
                res.status(401).json({ msg: 'user not found' })
            }
    }catch(err){
        console.log(err)
    }
}

exports.viewOfferAppli=async(req,res)=>{
    try{
        if (req.headers.token) {
            const findOffer=await submitUserDetail.find({_id:req.params.id,viewOfferAccept:true})
            if(findOffer.length===0){
            const postJob=await submitUserDetail.findByIdAndUpdate({_id:req.params.id},{viewOfferAccept:true})
            if(postJob){
                res.status(200).json({msg:'success accept offer'})
               }else{
                   res.status(500).json({ msg:'somthing wait worrong' })
               }
               }else{
                   res.status(403).json({ msg: 'alredy accept offer' })
               }
            }else{
                res.status(401).json({ msg: 'user not found' })
            }
    }catch(err){
        console.log(err)
    }
}

exports.getEmployerChatData=async(req,res)=>{
    try {
            // console.log(req.params.submitUserId);
            if (req.headers.token) {
            const result = await submitUserDetail.find({
                acceptOffer:true,
                viewOfferAccept:true}).populate("jobId").populate("submitUserId");
            const data=result.filter((item)=>(item.jobId.jobaddUserId==req.params.UserId));
            if(data.length>0){
             res.status(200).json({message:'success', data:data })
            }else{
                res.status(500).json({ msg:'somthing wait worrong' })
            }
            }else{
                res.status(401).json({ msg: 'user not found' })
            }
        } catch (error) {
            console.log(error)
        }
    }

exports.getJobseekerChatData=async(req,res)=>{
        try {
                // console.log(req.params.submitUserId);
                if (req.headers.token) {
                const result = await submitUserDetail.find({
                    submitUserId:req.params.UserId,
                    acceptOffer:true,
                    viewOfferAccept:true}).populate({path:'jobId',populate:{path:'jobaddUserId'}});
                if(result.length>0){
                 res.status(200).json({message:'success', data:result })
                }else{
                    res.status(500).json({ msg:'somthing wait worrong' })
                }
                }else{
                    res.status(401).json({ msg: 'user not found' })
                }
            } catch (error) {
                console.log(error)
            }
        }
