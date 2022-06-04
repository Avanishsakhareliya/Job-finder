import axios from 'axios'
import { message } from 'antd';


export const submitUserData=async(data)=>{
    const token=localStorage.getItem('Token')
        const jobinfo=await axios({
            method: 'post',
            url: 'https://api-job-finder.herokuapp.com/api/addsubmitUserDetails',
            headers: {"token":token},
            data:data
          });
      if(jobinfo.status==200){
          return {msg:'success',data:jobinfo}
      }else{
        return {msg:'fail'}
      }
}

export const getSubmitUserData=async(userId)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'get',
          url: `https://api-job-finder.herokuapp.com/api/getsubmituserdetails/${userId}`,
          headers: {"token":token},
        });
    if(jobinfo.status==200){
        return {msg:'success',data:jobinfo}
    }else{
      return {msg:'fail'}
    }
}

export const getnotifiyuserdetails=async(userId)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'get',
          url: `https://api-job-finder.herokuapp.com/api/getnotifiyuserdetails/${userId}`,
          headers: {"token":token},
        });
    if(jobinfo.status==200){
        return {msg:'success',data:jobinfo}
    }else{
      return {msg:'fail'}
    }
}

export const userNotification=async(userId)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'get',
          url: `https://api-job-finder.herokuapp.com/api/userNotification/${userId}`,
          headers: {"token":token},
        });
    if(jobinfo.status==200){
        return {msg:'success',data:jobinfo}
    }else{
      return {msg:'fail'}
    }
}
export const userViewJobOffer=async(userId)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'get',
          url: `https://api-job-finder.herokuapp.com/api/userViewJobOffer/${userId}`,
          headers: {"token":token},
        });
    if(jobinfo.status==200){
        return {msg:'success',data:jobinfo}
    }else{
      return {msg:'fail'}
    }
}

export const deleteNotification=async(id)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'post',
          url: `https://api-job-finder.herokuapp.com/api/deleteNotification/${id}`,
          headers: {"token":token},
        });
    if(jobinfo.status==200){
        return {msg:'success'}
    }else{
      return {msg:'fail'}
    }
}

export const deleteuserViewJobOffer=async(id)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'post',
          url: `https://api-job-finder.herokuapp.com/api/deleteuserViewJobOffer/${id}`,
          headers: {"token":token},
        });
    if(jobinfo.status==200){
        return {msg:'success'}
    }else{
      return {msg:'fail'}
    }
}

export const deleteUserNotification=async(id)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'post',
          url: `https://api-job-finder.herokuapp.com/api/deleteUserNotification/${id}`,
          headers: {"token":token},
        });
    if(jobinfo.status==200){
        return {msg:'success'}
    }else{
      return {msg:'fail'}
    }
}

export const AcceptOffer=async(id)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'post',
          url: `https://api-job-finder.herokuapp.com/api/offerappli/${id}`,
          headers: {"token":token},
        
      }).catch((err)=>{if(err.response.status===403){message.error('alredy accept offer')}});
    if(jobinfo.status==200){
        return {msg:'success',jobinfo}
    }else{
      return {msg:'fail',jobinfo}
    }
}

export const getJobOffer=async(userId)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'get',
          url: `https://api-job-finder.herokuapp.com/api/getJobOffer/${userId}`,
          headers: {"token":token},
        });
    if(jobinfo.status==200){
        return {msg:'success',data:jobinfo}
    }else{
      return {msg:'fail'}
    }
}

export const getPostJoblist=async(userId)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'get',
          url: `https://api-job-finder.herokuapp.com/api/getPostJoblist/${userId}`,
          headers: {"token":token},
        });
    if(jobinfo.status==200){
        return {msg:'success',data:jobinfo}
    }else{
      return {msg:'fail'}
    }
}

export const getUserSubmitJobDetail=async(userId)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'get',
          url: `https://api-job-finder.herokuapp.com/api/getUserSubmitJobDetail/${userId}`,
          headers: {"token":token},
        });
    if(jobinfo.status===200){
        return {msg:'success',data:jobinfo}
    }else{
      return {msg:'fail'}
    }
}

export const getJobprofile=async(userId)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'get',
          url: `https://api-job-finder.herokuapp.com/api/getJobprofile/${userId}`,
          headers: {"token":token},
        });
    if(jobinfo.status===200){
        return {msg:'success',data:jobinfo}
    }else{
      return {msg:'fail'}
    }
}

export const setHideprofile=async(id,data)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'post',
          url: `https://api-job-finder.herokuapp.com/api/setHideprofile/${id}`,
          headers: {"token":token},
          data:data
      }).catch((err)=>{if(err.response.status===403){message.error('alredy accept offer')}});
    if(jobinfo.status==200){
        return {msg:'success',jobinfo}
    }else{
      return {msg:'fail',jobinfo}
    }
}

export const getUserData=async(userId)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'get',
          url: `https://api-job-finder.herokuapp.com/api/getUser/${userId}`,
          headers: {"token":token},
        })
    if(jobinfo.status==200){
        return {msg:'success',data:jobinfo}
    }else{
      return {msg:'fail'}
    }
}

export const deleteAccount=async(userId,data)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'post',
          url: `https://api-job-finder.herokuapp.com/api/deleteAccount/${userId}`,
          headers: {"token":token},
          data:data
        })
    if(jobinfo.status==200){
        return {msg:'success', jobinfo}
    }else{
      return {msg:'fail'}
    }
}

export const addJob=async(data)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'post',
          url: `https://api-job-finder.herokuapp.com/api/addjob`,
          headers: {"token":token},
          data:data
        })
    if(jobinfo.status==200){
        return {msg:'success', data:jobinfo}
    }else{
      return {msg:'fail'}
    }
}

export const ViewApllyoffer=async(id)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'post',
          url: `https://api-job-finder.herokuapp.com/api/viewAcceptOffer/${id}`,
          headers: {"token":token}
      }).catch((err)=>{if(err.response.status===403){message.error('alredy accept offer')}});
    if(jobinfo.status==200){
        return {msg:'success',jobinfo}
    }else{
      return {msg:'fail',jobinfo}
    }
}


export const getEmployerChatData=async(id)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'get',
          url: `https://api-job-finder.herokuapp.com/api/getEmployerChatData/${id}`,
          headers: {"token":token}
      });
    if(jobinfo.status==200){
        return {msg:'success',jobinfo}
    }else{
      return {msg:'fail',jobinfo}
    }
}

export const getJobseekerChatData=async(id)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'get',
          url: `https://api-job-finder.herokuapp.com/api/getJobseekerChatData/${id}`,
          headers: {"token":token}
      });
    if(jobinfo.status==200){
        return {msg:'success',jobinfo}
    }else{
      return {msg:'fail',jobinfo}
    }
}

export const setEmployerAccount=async(data)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'post',
          url: 'https://api-job-finder.herokuapp.com/api/setEmployerAccout',
          headers: {"token":token},
          data:data
        }).catch((err)=>{if(err.response.status===405){message.error('alredy exit email')}});
    if(jobinfo.status==200){
        return {msg:'success',data:jobinfo}
    }else{
      return {msg:'fail'}
    }
}

export const AddWatchList=async(data)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'post',
          url: 'https://api-job-finder.herokuapp.com/api/addwatchlist',
          headers: {"token":token},
          data:data
        }).catch((err)=>{if(err.response.status===400){message.error('alredy add Job')}});
    if(jobinfo.status==200){
        return {msg:'success',jobinfo}
    }else{
      return {msg:'fail'}
    }
}

export const getWatchList=async(id)=>{
  const token=localStorage.getItem('Token')
      const jobinfo=await axios({
          method: 'get',
          url: `https://api-job-finder.herokuapp.com/api/getJobWatchkist/${id}`,
          headers: {"token":token},
        })
    if(jobinfo.status==200){
        return {msg:'success',jobinfo}
    }else{
      return {msg:'fail'}
    }
}

export const deleteJobWatchkist=async(data)=>{
  const token=localStorage.getItem('Token')
      const result=await axios({
          method: 'delete',
          url: `https://api-job-finder.herokuapp.com/api/deleteJobWatchkist`,
          headers: {"token":token},
          data:data
        })
    if(result.status==200){
        return {msg:'success',result}
    }else{
      return {msg:'fail'}
    }
}