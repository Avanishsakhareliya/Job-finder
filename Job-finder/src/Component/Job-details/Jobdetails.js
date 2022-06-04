import React,{useState,useEffect} from 'react'
import Header2 from '../Header-2/Header2'
import map_image_job from '../../assets/image/map-image-job.png'
import Job_brand_svg from '../../assets/image/brand-svg-job.svg'
import Social_icon_1 from '../../assets/image/social-icon-1.svg'
import Social_icon_2 from '../../assets/image/social-icon-2.svg'
import Social_icon_3 from '../../assets/image/social-icon-3.svg'
import Social_icon_4 from '../../assets/image/social-icon-4.svg'
import './Jobdetails.css'
import {Link, useParams} from 'react-router-dom'
import { Tooltip, Button, message } from 'antd';
import axios from 'axios'
import { AddWatchList } from '../Utils/_data'

const Jobdetails=()=>{
    const [jobdata,setJobdata]=useState({});
const params=useParams()
const userData=JSON.parse(localStorage.getItem('User'))

    const onGetJobData=async()=>{
        const token=localStorage.getItem('Token')
        const jobinfo=await axios({
            method: 'get',
            url: `https://job-finder-server.herokuapp.com/api/getjobdataById/${params.jobId}`,
            headers: {"token":token}
          });
        console.log('jobinfo',jobinfo)
        if(jobinfo.status===200){
            setJobdata(jobinfo.data.getJobdata[0])
        }else{
            console.log("something wait wrong")
        }
    }

    function myFunction() {
        /* Get the text field */
        var copyText = document.getElementById("myInput");
      
        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
      
        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText.value);
      
        /* Alert the copied text */
        message.success('sucessfull copy Url')

      }

      const addwatchlist=async()=>{
          const obj={
            AddUserId:userData._id,
            jobId:params.jobId
          }
     const addlist=await AddWatchList(obj)
     console.log("addlist",addlist);
     if(addlist.jobinfo.status===200){
        message.success('successfully add watch list')
     }else{
        message.error('somthing wait wrong')
     }
      }

    useEffect(() => {
    document.getElementById("google_translate_element").classList.remove("mylanguage")

        onGetJobData()
    }, [])

    return<>
     <Header2 />  
     <div class="job-details job-open-offer">
            <div class="container">
                <div class="back-link"><Link to='/mapview2'>{`<`} back</Link></div>
                <div class="job-details-wrapper">
                    <h2>Job Description</h2>
                    <div class="job-content-wrapper">
                     <div class="brand-logo">
                         <img src={Job_brand_svg} alt="logo"/>   
                     </div>
                      <div class="row">
                        <div class="left-section">
                            <h2 class="name">{jobdata?.jobtitle || jobdata?.role_name }</h2>
                            <div class="company-name">{jobdata.company_name}</div>
                            <div class="location">Location: {jobdata.company_name}</div>
                            <div class="job-type">Jop Type: {jobdata.location}</div>
                            <div class="salary">Salary: {jobdata.salary}</div>
                            <div class="description">
                               <p> {jobdata.job_details}</p>        
                            </div>
                            <div class="map">
                            <iframe src={`https://maps.google.com/maps?q=${jobdata.lat}, ${jobdata.lng}&z=15&output=embed`} height='300px' width={'400px'} frameborder="0"></iframe>  
                            </div>
                        </div>
                        <div class="right-section">
                        <Link to={`/submitionapp/${params.jobId}`}>
                            <div class="apply-button">
                                <a href="#">Apply Now</a>
                            </div>
                            </Link>
                            <ul class="social-icon">
                                <li>
                                    <a href="#">
                                        <img src={Social_icon_1} alt="social-icon-1"/>   
                                    </a>
                                </li>
                                <li>
                                <Tooltip placement="bottom" title={'Add WatchList'}>
                                    <a href="#" onClick={addwatchlist}>
                                        <img src={Social_icon_2} alt="social-icon-2"/>   
                                    </a>
                                    </Tooltip>
                                </li>
                                <li>
                                <input type="text" value={document.location.href} id="myInput" style={{display:'none'}}></input>
                                <Tooltip placement="bottom" title={'Copy Link'}>
                                    <a href="#" onClick={myFunction}>
                                         <img src={Social_icon_3} alt="social-icon-3"/>   
                                    </a>
                                    </Tooltip>
                                </li>
                                <li>
                                    <a href="#">
                                         <img src={Social_icon_4} alt="social-icon-4"/> 
                                    </a>
                                </li>
                            </ul>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="border-bottom"></div>

     </>
}

export default Jobdetails