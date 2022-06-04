import React, { useEffect } from 'react'
import Header2 from '../Header-2/Header2'
import Notification from '../../assets/image/notification-setting.svg'
import User from '../../assets/image/profile.svg'
import Account from '../../assets/image/account.svg'
import Privacy from '../../assets/image/privcy.svg'

import './setting.css'
import { Link } from 'react-router-dom'


const Setting=()=>{
    useEffect(()=>{
    document.getElementById("google_translate_element").classList.remove("mylanguage")
    },[])
    return<>
     <Header2/>  

     <div class="setting-section">
            <div class="container">
              <div class="back-link"><a href="#">{`<`} back</a></div>
                <div class="setting-wrapper">
                <div class="link">
                    <h2 class="heading">Settings</h2>
                    <div class="right-link"><a href="#"> Become an Employer</a></div>
                </div>
                    <div class="setting-inner">
                       <div class="row">
                        <div class="setting-item">
                       <Link to={'/notificationsetting'}>
                            <div class="icon">
                                <img src={Notification} alt="image" />
                            </div>
                            <div class="title">Notifications Settings</div>
                            <div class="description">Manage the job notifications, Alerts for relevant jobs and new opportunies.</div>
                        </Link>
                        </div>
                        <div class="setting-item">
                        <Link to={'/profilesetting'}>
                            <div class="icon">
                                <img src={User} alt="image" />
                            </div>
                            <div class="title">Profile</div>
                            <div class="description">Manage your personal information, job poistion
                            and employment status. You can change the app language too.</div>
                        </Link>
                        </div>
                        <div class="setting-item">
                        <Link to={'/accountsetting'}>
                            <div class="icon">
                                <img src={Account} alt="image" />
                            </div>
                            <div class="title">Account</div>
                            <div class="description">Manage your credentials, and contact information,</div>
                        </Link>
                        </div>
                        <div class="setting-item">
                        <Link to={'/privacysetting'}>
                            <div class="icon">
                                <img src={Privacy} alt="image" />
                            </div>
                            <div class="title">Privacy</div>
                            <div class="description">Manage your location, and who can see your resume, profile and contact information.</div>
                        </Link>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>

     </>
}

export default Setting