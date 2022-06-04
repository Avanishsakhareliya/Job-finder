import React, { useEffect, useState } from 'react'
import Header2 from '../Header-2/Header2'
import Offers_icon from '../../assets/image/Offers-icon.svg'
import Applied_icon from '../../assets/image/applied_icon.svg'
import Unfinished_icon from '../../assets/image/unfinished_icon.svg'

import './jobapplication.css'
import { Link } from 'react-router-dom'
import { getSubmitUserData, userViewJobOffer } from '../Utils/_data'


const Jobapplication=()=>{
    const [offer,setOffer]=useState([])
    const userData=JSON.parse(localStorage.getItem('User'))
    const [Usernotify,setUsernotify]=useState([])

    const getApliedOffer=async()=>{
        const respons=await getSubmitUserData(userData._id)
        if(respons.data.status===200)
        {
        setOffer(respons.data.data.data)
        }else{
            console.log('respons not found',respons)
        }
     }

     const getuserNotification=async()=>{
        const respons=await userViewJobOffer(userData._id)
        console.log('respons',respons)
 
        if(respons.data.status===200)
        {
            setUsernotify(respons.data.data.findOffer);
        }else{
            console.log('respons not found',respons)
        }
     }

     useEffect(()=>{
        getApliedOffer()
        getuserNotification()
    document.getElementById("google_translate_element").classList.remove("mylanguage")

     },[])
    return<>
     <Header2/> 

     <div class="jobapplication-section">
            <div class="container">
            <div class="back-link"><Link to="/">{`<`} back</Link></div>
                <div class="jobapplication-wrapper">
                    <h2 class="heading">My Jobs’ Applications</h2>
                    <div class="jobapplication-inner">
                        <div class="jobapplication-item">
                            <div class="left-part">
                                <div class="icon">
                                    <img src={Offers_icon} alt="delete"/> 
                                </div>
                            <span class="name"><Link to='/Joboffer'>Offers</Link></span>
                            </div>
                            <div class="right-part">
                                <div class="no">{Usernotify?.length || '0'}</div>
                            </div>
                        </div>
                        <div class="jobapplication-item">
                          <div class="left-part">
                            <div class="icon">
                                <img src={Applied_icon} alt="delete"/> 
                            </div>
                            <span class="name"><Link to='/openoffer2'>Applied Applications</Link></span>
                           </div>
                            <div class="right-part">
                                <div class="no">{offer?.length || '0'}</div>
                            </div>
                        </div>
                        {/* <div class="jobapplication-item">
                         <div class="left-part">
                            <div class="icon">
                                <img src={Unfinished_icon} alt="delete"/> 
                            </div>
                            <span class="name">Unfinished Applications</span>
                            </div>
                            <div class="right-part">
                                <div class="no">1</div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>

        <div class="border-bottom"></div>

     </>
}

export default Jobapplication