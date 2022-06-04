import React from 'react'
import Header2 from '../Header-2/Header2'
import Setting_icon1 from '../../assets/image/setting-1.svg'
import Setting_icon2 from '../../assets/image/setting-2.svg'
import Setting_icon3 from '../../assets/image/setting-3.svg'
import { Link } from 'react-router-dom'

import './Notificationsetting.css'


const Notificationsetting=()=>{
React.useEfect(()=>{
     document.getElementById("google_translate_element").classList.remove("mylanguage")

},[])
    return<>
     <Header2/> 
     
     <div class="notificationsetting-section">
        <div class="container">
            <div class="back-link"><Link to="/setting">{`<`} back</Link></div>
            <div class="notificationsetting-wrapper">
                <h2 class="heading">Notifications Settings</h2>
                <div class="notificationsetting-inner">
                    <div class="notificationsetting-item">
                        <div class="setting-field">
                          <div class="left-part">
                            <div class="icon"><img src={Setting_icon1} alt="delete"/> </div>
                            <span class="setting-name">Job Notification</span>
                           </div>
                           <div class="field-item">
                                <input type="checkbox" id="on1" name="on1" value="on1" />
                                <label for="on1">ON</label>
                           </div>
                           <div class="field-item">
                                <input type="checkbox" id="off1" name="off1" value="off1" />
                                <label for="off1">OFF</label>
                           </div>
                        </div>
                        <div class="setting-field">
                          <div class="left-part">
                            <div class="icon"><img src={Setting_icon2} alt="delete"/> </div>
                            <span class="setting-name">Relevant Jobs / New opportunites</span>
                           </div>
                           <div class="field-item">
                                <input type="checkbox" id="on2" name="on2" value="on2" />
                                <label for="on2">ON</label>
                           </div>
                           <div class="field-item">
                                <input type="checkbox" id="off2" name="off2" value="off2" />
                                <label for="off2">OFF</label>
                           </div>
                        </div>
                        <div class="setting-field">
                          <div class="left-part">
                            <div class="icon"><img src={Setting_icon3} alt="delete"/> </div>
                            <span class="setting-name">News</span>
                           </div>
                           <div class="field-item">
                                <input type="checkbox" id="on3" name="on3" value="on3" />
                                <label for="on3">ON</label>
                           </div>
                           <div class="field-item">
                                <input type="checkbox" id="off3" name="off3" value="off3" />
                                <label for="off3">OFF</label>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>

     <div class="border-bottom"></div>

</>
}

export default Notificationsetting