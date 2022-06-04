import React,{useState,useEffect} from 'react'

import Header2 from '../Header-2/Header2'
import Job_brand_svg from '../../assets/image/brand-svg-job.svg'
import { Link,useParams,useHistory } from 'react-router-dom'
import {getJobOffer,ViewApllyoffer} from '../Utils/_data'
import './Continueapply.css'

const Continueapply=()=>{
    const [Usernotify,setUsernotify]=useState([])
    const userData=JSON.parse(localStorage.getItem('User'))
    const params=useParams()
const history=useHistory()
    const getuserNotification=async()=>{
        const respons=await getJobOffer(params.jobId)
        console.log('respons',respons)
 
        if(respons.data.status===200)
        {
            setUsernotify(respons.data.data.findOffer)
        }else{
            console.log('respons not found',respons)
        }
     }

     const onViewApllyoffer=async(id)=>{
const data=await ViewApllyoffer(id)
console.log('data',data)
if(data.jobinfo.status===200){
    history.push('/congratulations')
}else{
    console.log('respons not found',data)
}
     }

     useEffect(()=>{
        if(userData?.role==='Jobseeker'){
        getuserNotification()
        }
    document.getElementById("google_translate_element").classList.remove("mylanguage")

    },[])
    return<>
     <Header2 />  
     <div class="job-details job-open-offer continue-apply">
            <div class="container">
                <div class="back-link"><Link to={'/joboffer'}>{`<`} back</Link></div>
                <div class="job-details-wrapper">
                    <h2>My Job Offers</h2>
                    <div class="job-content-wrapper">
                     <div class="brand-logo">
                         <img src={Job_brand_svg} alt="logo"/>   
                     </div>
                     {Usernotify&&Usernotify.map((item)=>(
                         <>
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
                        </div>
                        <div class="right-section">
                            <div class="apply-button" onClick={()=>onViewApllyoffer(item._id)}>
                                <a href="#">Continue applying</a>
                            </div>
                            <div class="decline-offer">
                                <a href="#">Cancel</a>
                            </div>
                        </div>
                      </div>
                         </>
                     ))}
                      
                    </div>
                </div>
            </div>
        </div>
     </>
}

export default Continueapply