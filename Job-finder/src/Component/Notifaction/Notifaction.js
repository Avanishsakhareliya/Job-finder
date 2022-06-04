import React,{useState,useEffect} from 'react'
import Header2 from '../Header-2/Header2'
import Delete_icon from '../../assets/image/delete-icon.svg'
import {getnotifiyuserdetails,deleteNotification,userNotification,deleteUserNotification} from '../Utils/_data'
import moment from 'moment';
import { message } from 'antd';
import {Link} from 'react-router-dom'

import './Notifaction.css'

const Notifaction=()=>{
    const [notify,setnotify]=useState([])
    const [Usernotify,setUsernotify]=useState([])
    const userData=JSON.parse(localStorage.getItem('User'))
    
    const getApliedOffer=async()=>{
       const respons=await getnotifiyuserdetails(userData._id)
       console.log('respons',respons)

       if(respons.data.status===200)
       {
        setnotify(respons.data.data.data)
       }else{
           console.log('respons not found',respons)
       }
    }

    const getuserNotification=async()=>{
        const respons=await userNotification(userData._id)
        console.log('respons',respons)
 
        if(respons.data.status===200)
        {
            setUsernotify(respons.data.data.findOffer)
        }else{
            console.log('respons not found',respons)
        }
     }

    const onNotificationDelet=async(id)=>{
 const respons=await deleteNotification(id)
 console.log('respons not found',respons)

 if(respons.msg==='success')
       {
        message.success('successfull deleted notification')
        getApliedOffer()
       }else{
           console.log('respons not found',respons)
       }
    }

    const onUserNoificationDelet=async(id)=>{
        const respons=await deleteUserNotification(id)
        console.log('respons not found',respons)
       
        if(respons.msg==='success')
              {
               message.success('successfull deleted notification')
               getuserNotification()
              }else{
                  console.log('respons not found',respons)
              }
           }

    useEffect(()=>{
    document.getElementById("google_translate_element").classList.remove("mylanguage")

        if(userData?.role==='Employer'){
        getApliedOffer()
        }else{
        getuserNotification()
        }
    },[])

    return<>
     <Header2/>  

     <div class="notifaction-section">
            <div class="container">
            <div class="back-link"><Link to='/mapview2'>{`<`} back</Link></div>
                <div class="notifaction-wrapper">
                    <h2 class="heading">Notifications</h2>
                    <div class="notifaction-inner">
                    {userData?.role==='Employer'?notify&&notify.map((item)=>(
                        <div class="notification-item">
                            <div class="name">applied for your job {item.submitUserId.fullname}</div>
                            <div class="right-part">
                                <div class="date">{moment(item).format('MMM DD')}</div>
                                <div class="icon">
                                  <img src={Delete_icon} alt="delete" onClick={()=>onNotificationDelet(item._id)}/> 
                                </div>
                            </div>
                        </div>
                    )):Usernotify&&Usernotify.map((item)=>(
                        <div class="notification-item">
                            <div class="name">accept offer in {item.jobId.postedBy}</div>
                            <div class="right-part">
                                <div class="date">{moment(item).format('MMM DD')}</div>
                                <div class="icon">
                                  <img src={Delete_icon} alt="delete" onClick={()=>onUserNoificationDelet(item._id)}/> 
                                </div>
                            </div>
                        </div>
                    ))}
                        
                    </div>
                </div>
            </div>
        </div>

        <div class="border-bottom"></div>

     </>
}

export default Notifaction