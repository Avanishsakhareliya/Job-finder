const watchlist = require("../Schema/Whatchlist")

exports.addJobWatchlist=async(req,res)=>{
    try{
        if (req.headers.token) {
const finduser=await watchlist.find({AddUserId:req.body.AddUserId,jobId:req.body.jobId})
console.log('finduser',finduser)
if(finduser.length!==0){
    return res.status(400).json({massege:false})
}else{
const savewatch=await watchlist.create(req.body)
if(savewatch){
    return res.status(200).json({massege:true,})
}
}
   }else{
   res.status(401).json({ msg: 'user not found' })
            }
    }catch(e){
        console.log(e)
    }
}

exports.getJobWatchkist=async(req,res)=>{
try{
    if (req.headers.token) {

const finduser=await watchlist.find({AddUserId:req.params.Id}).populate("jobId").populate("AddUserId")
if(finduser){
     res.status(200).json({massege:true,finduser})
}else{
    res.status(400).json({massege:'somthing wait wrrog'})
}
}else{
    res.status(401).json({ msg: 'user not found' })
             }
}catch(e){
    console.log(e)

}
}

exports.DeleteJobWatchkist=async(req,res)=>{
    try{
        if (req.headers.token) {
    
    const finduser=await watchlist.findOneAndDelete({AddUserId:req.body.AddUserId,jobId:req.body.jobId})
    if(finduser){
         res.status(200).json({massege:'successfully delete watch list'})
    }else{
        res.status(400).json({massege:'somthing wait wrrog'})
    }
    }else{
        res.status(401).json({ msg: 'user not found' })
                 }
    }catch(e){
        console.log(e)
    
    }
    }
