import React, { useEffect, useState } from 'react'
import Header2 from '../Header-2/Header2'
import Privacy_location from '../../assets/image/privacy-location.svg'
import Privacy_resume from '../../assets/image/privacy-resume.svg'
import Privacy_profile from '../../assets/image/privacy-profile.svg'
import Privacy_contact from '../../assets/image/privacy-contact.svg'
import {setHideprofile} from '../Utils/_data'

import './Privacysetting.css'
import { Link } from 'react-router-dom'
import { message } from 'antd'


const Privacysetting=()=>{

   const  [location,setLocation]=useState({on:false,off:true})
   const  [hideprofile,sethideprofile]=useState({on:false,off:true})

  const userData=JSON.parse(localStorage.getItem('User'))


    const getcurrentLocation=()=>{
        navigator.permissions && navigator.permissions.query({name: 'geolocation'})
        .then(function(PermissionStatus) {
            if (PermissionStatus.state == 'granted') {
                setLocation({on:true,off:false})
            } else if (PermissionStatus.state == 'denied') {
                setLocation({on:false,off:true})
            } else {
                setLocation({on:false,off:true})
            }
        })
    }

    const onHandalLocation=(e)=>{
if(e.target.checked){
    if(e.target.name==='on'){
        setLocation({on:true,off:false})
      
    }else{
        setLocation({on:false,off:true})
         
    }
    getcurrentLocation()
}
    }

    const onHandalHideprofile=async(e)=>{
        if(e.target.checked){
            if(e.target.name==='on'){
                const check= await setHideprofile(userData._id,{
                    hideprofile:true})
                    console.log('ckecl',check)
                    if(check.jobinfo.status==200){
                sethideprofile({on:true,off:false})
            localStorage.setItem('User', JSON.stringify(check.jobinfo.data.data))
                        message.success('Hide profile successfull set')
                    }
            }else{
                const check=await setHideprofile(userData._id,{
                    hideprofile:false})   
                    if(check.jobinfo.status==200){
                sethideprofile({on:false,off:true})  
                localStorage.setItem('User', JSON.stringify(check.jobinfo.data.data))
                        message.success('Public profile successfull set')
                    }
            }
        }
            }

    useEffect(()=>{
        getcurrentLocation()
        if(userData){
            if(userData.hideprofile===true){
                sethideprofile({on:true,off:false})
            }
        }
    },[])
    return<>
     <Header2/>  
      
     <div class="privacy-page">
        <div class="container">
        <div class="back-link"><Link to="/setting">{`<`} back</Link></div>
            <div class="privacy-wrapper">
                <h2>Privacy Settings</h2>
                <div class="privacy-inner">
                    <div class="form-field">
                        <div class="name">
                            <img src={Privacy_location} /> 
                            <span>Current Location</span>
                        </div>
                        <div class="form-field-item">
                            <input type="checkbox" id="location" name="on" value={location.on} checked={location.on?true:false} onChange={onHandalLocation}/>
                            <label for="location">ON (Show current location)</label>
                        </div>
                        <div class="form-field-item">
                            <input type="checkbox" id="off" name="off" value={location.off} checked={location.off?true:false} onChange={onHandalLocation}/>
                            <label for="off">OFF  (Shoe estimated location)</label>
                        </div>
                        <div class="form-field-item">
                        </div>
                    </div>
                    <div class="form-field">
                        <div class="name">
                            <img src={Privacy_resume} />
                            <span>Decide Who can see my resume</span>
                        </div>
                        <div class="form-field-item">
                            <input type="checkbox" id="onlyjob" name="onlyjob" value="onlyjob" />
                            <label for="onlyjob">Only Jobs that I applied for</label>
                        </div>
                        <div class="form-field-item">
                            <input type="checkbox" id="everyone" name="everyone" value="everyone" />
                            <label for="everyone">Everyone</label>
                        </div>
                        <div class="form-field-item">
                            <input type="checkbox" id="onone" name="onone" value="onone" />
                            <label for="onone">No one</label>
                        </div>
                    </div>
                    <div class="form-field">
                        <div class="name">
                            <img src={Privacy_profile} />
                            <span>Hide my profile</span>
                        </div>
                        <div class="form-field-item">
                            <input type="checkbox" id="profileon" name="on" value={hideprofile.on} onChange={onHandalHideprofile} checked={hideprofile.on?true:false}/>
                            <label for="profileon" >ON</label>
                        </div>
                        <div class="form-field-item">
                            <input type="checkbox" id="profileof" name="off" value={hideprofile.off} onChange={onHandalHideprofile} checked={hideprofile.off?true:false}/>
                            <label for="profileof">OFF</label>
                        </div>
                        <div class="form-field-item">
                        </div>
                    </div>
                    <div class="form-field">
                        <div class="name">
                            <img src={Privacy_contact} />
                            <span>Hide my contact information</span>
                        </div>
                        <div class="form-field-item">
                            <input type="checkbox" id="contacton" name="contacton" value="contacton" />
                            <label for="contacton">ON</label>
                        </div>
                        <div class="form-field-item">
                            <input type="checkbox" id="contactoff" name="contactoff" value="contactoff" />
                            <label for="contactoff">OFF</label>
                        </div>
                        <div class="form-field-item">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

     <div class="border-bottom"></div>

</>
}

export default Privacysetting