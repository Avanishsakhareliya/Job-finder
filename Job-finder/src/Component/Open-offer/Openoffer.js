import React,{useState,useEffect} from 'react'
import Header2 from '../Header-2/Header2'
import map_image_job from '../../assets/image/map-image-job.png'
import Job_brand_svg from '../../assets/image/brand-svg-job.svg'
import {getnotifiyuserdetails,AcceptOffer} from '../Utils/_data'
import { message } from 'antd';

import './Openoffer.css'

const Openoffer=()=>{

    const [notify,setnotify]=useState([])
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

    const onAcceptOffer=async(id)=>{
    const respons=await AcceptOffer(id);
    console.log('respons',respons)
    if(respons.jobinfo.status===200){
        message.success('successfull accept offer')
    }
    else{
        message.error('alredy accept offer')
    }
    }

    useEffect(()=>{
        getApliedOffer() 
    document.getElementById("google_translate_element").classList.remove("mylanguage")

       },[])
    return<>
     <Header2 />  
     <div class="job-details job-open-offer">
            <div class="container">
                <div class="back-link"><a href="#">{`<`} back</a></div>
                <div class="job-details-wrapper">
                    <h2>My Job Offers</h2>
                    {notify&&notify.map((item)=>(

<>
<div class="job-content-wrapper">
                     <div class="brand-logo">
                         <img src={Job_brand_svg} alt="logo"/>   
                     </div>
                      <div class="row">
                        <div class="left-section">
                            <h2 class="name">OFFER: Job Title goes here</h2>
                            <div class="company-name">{item.jobId.company_name}</div>
                            <div class="location">Location: {item.jobId.location}</div>
                            <div class="job-type">Jop Type: {item.jobId.job_type}</div>
                            <div class="salary">Salary: {item.jobId.salary}</div>
                            <div class="description">
                                        <p> 
                                        {item.jobId.job_details}
                                        </p>
                            </div>
                            <div class="map">
                                <img src={map_image_job} alt="map-image-job"/>   
                            </div>
                        </div>
                        <div class="right-section">
                            <div class="apply-button" onClick={()=>onAcceptOffer(item._id)}>
                              <a href='#'> Accept offer</a>
                            </div>
                            <div class="decline-offer">
                                <a href="#">Decline Offer</a>
                            </div>
                        </div>
                      </div>
                    </div>
</>
                    ))}
                    
                    {/* <div class="job-content-wrapper">
                     <div class="brand-logo">
                         <img src={Job_brand_svg} alt="logo"/>   
                     </div>
                      <div class="row">
                        <div class="left-section">
                            <h2 class="name">OFFER: Job Title goes here</h2>
                            <div class="company-name">Company Name Goes here</div>
                            <div class="location">Location: xxxxxxxxxxxx</div>
                            <div class="job-type">Jop Type: xxxxxxxxxxxxx</div>
                            <div class="salary">Salary: xxxxxxxx</div>
                            <div class="description">
                                        <p> 
                                            Job description or details needed
                                            goes here. Job description or details needed Job description or details needed goes here.Job description or details needed
                                            goes here. Job description or details needed
                                            goes here.Job description or details needed goes here. Job description or details needed goes here. Job description or details needed
                                        </p>
                                        <p>
                                            Job description or details needed
                                            goes here. Job description or details needed Job description or details needed goes here.Job description or details needed
                                            goes here. Job description or details needed
                                            goes here.Job description or details needed goes here. Job description or details needed goes here. Job description or details neededgoes here. Job description or details needed Job description or details needed goes here.Job description or details needed
                                            goes here. Job description or details needed
                                            goes here.Job description or details needed goes here. Job description or details needed goes here. Job description or details needed
                                            Job description or details needed
                                            goes here. Job description or details needed Job description or details needed goes here.Job description or details needed
                                            goes here. Job description or details needed
                                            goes here.Job description or details needed goes here. Job description or details needed goes here. Job description or details needed       
                                        </p>
                            </div>
                            <div class="map">
                                <img src={map_image_job} alt="map-image-job"/>   
                            </div>
                        </div>
                        <div class="right-section">
                            <div class="apply-button">
                                <a href="#">Apply Now</a>
                            </div>
                            <div class="decline-offer">
                                <a href="#">Decline Offer</a>
                            </div>
                        </div>
                      </div>
                    </div> */}
                </div>
            </div>
        </div>
     </>
}

export default Openoffer