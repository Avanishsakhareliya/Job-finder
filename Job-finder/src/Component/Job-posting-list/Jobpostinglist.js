import React,{useState,useEffect} from 'react'
import Header2 from '../Header-2/Header2'
import map_image_job from '../../assets/image/map-image-job.png'
import Job_brand_svg from '../../assets/image/brand-svg-job.svg'
import Social_icon_1 from '../../assets/image/social-icon-1.svg'
import Social_icon_2 from '../../assets/image/social-icon-2.svg'
import Social_icon_3 from '../../assets/image/social-icon-3.svg'
import Social_icon_4 from '../../assets/image/social-icon-4.svg'
import './Jobpostinglist.css'
import {getPostJoblist} from '../Utils/_data'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd'

const Jobpostinglist=()=>{
    const [jobdata,setJobdata]=useState([]);
const params=useParams()
const userData=JSON.parse(localStorage.getItem('User'))


    const onGetJobData=async()=>{
        const result=await getPostJoblist(userData._id)
        console.log('data',result)
        if(result.data.status===200){
        setJobdata(result.data.data.getJobdata)
        }else{
            message.error('somthing wait wrong')
        }
    }
    useEffect(() => {
        onGetJobData()
    document.getElementById("google_translate_element").classList.remove("mylanguage")

    }, [])

    return<>
     <Header2 />
     <div class="job-details job-open-offer">
            <div class="container">
                <div class="back-link"><Link to='/mapview2'>{`<`} back</Link></div>
                <div class="job-details-wrapper">
                    <h2>Job Posting Details</h2>
                    {jobdata && jobdata.map((item)=>(<>
                    <div class="job-content-wrapper">
                     <div class="brand-logo">
                         <img src={Job_brand_svg} alt="logo"/>   
                     </div>
                                             <div class="row">
                        <div class="left-section">
                            <h2 class="name">{item.company_name}</h2>
                            <div class="company-name">{item.job_category}</div>
                            <div class="location">Location:{item.location}</div>
                            <div class="job-type">Jop Type: {item.job_type}</div>
                            <div class="salary">Salary: {item.salary}</div>
                            <div class="salary">Education level: {item.Education_level}</div>
                            <div class="description">
                               <p> {item.job_details}</p>        
                            </div>
                            <div class="map">
                            {/* <iframe src={`https://maps.google.com/maps?q=${jobdata.lat}, ${jobdata.lng}&z=15&output=embed`} height='300px' width={'400px'} frameborder="0"></iframe>   */}
                            </div>
                        </div>
                        <div class="right-section">
                        <Link to={`/jobsubmitionusers/${item._id}`}>
                            <div class="apply-button">
                                <a href="#">Submit User Details</a>
                            </div>
                            </Link>
                        </div>
                      </div>
                      
                    </div>
                </>))}
                </div>
            </div>
        </div>

        <div class="border-bottom"></div>

     </>
}

export default Jobpostinglist