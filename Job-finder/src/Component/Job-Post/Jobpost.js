import React, { useEffect, useState } from 'react'
import Header2 from '../Header-2/Header2'
import './Jobpost.css'
import GooglePlacesAutocomplete,{ geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import axios from 'axios'
import {addJob} from '../Utils/_data'
import { message } from 'antd';
import { Link,useHistory } from "react-router-dom"
import { NavLink } from 'react-router-dom';

const Jobpost=()=>{
    const userData=JSON.parse(localStorage.getItem('User'))
    const [locvalue, setLocValue] = useState('')
    const [jobpost,setJobpost]=useState({
        jobaddUserId:userData._id,
        jobtitle:'',
        role_name: '',
        company_name: '',
        company_video: '',
        job_category:'',
        job_type: '',
        location: '',
        locationUrl:'',
        job_details: '',
        salary: '',
        postedBy:userData.role,
        Education_level:'',
        lat: null,
        lng: null
    })

    const history=useHistory()
    const [Validation,setValidation]=useState({})

    const onHandaleJobpost=async(e)=>{
setJobpost({...jobpost,[e.target.name]:e.target.value})
    }

    const findlatlon=async()=>{
    await  geocodeByAddress(jobpost.location||'')
  .then(results => getLatLng(results[0]))
  .then(({ lat, lng }) =>
  setJobpost({...jobpost,lat:lat,lng:lng})
  );
    }

    useEffect(()=>{
      findlatlon()

    },[jobpost.location])

    useEffect(()=>{
    document.getElementById("google_translate_element").classList.remove("mylanguage")

    },[])

    const ctagary=[{label:'Summer jobs'},
    {label:'Restaurants & Cafes'},
    {label:'Summer jobs'},
    {label:'Fitness'},
    {label:'Hotels & hostels'},
    {label:'Finance'},
    {label:'Office & Admin'},
    {label:'Healthcare'},
    {label:'Sales & Marketing'},
    {label:'Teaching'},
    {label:'Transportation'},
    {label:'Security'},
    {label:'DIY'},
    {label:'Retail'},
  ]

  const validation = (name, value) => {
    switch (name) {
        case 'jobtitle':
            if (!value) {
                return "'Please input job title!'"
            } else {
                return '';
            }
        case 'company_name':
            if (!value) {
                return "'Company Name'"
            } else {
                return '';
            }
        case 'job_category':
            if (!value) {
                return "'Job Category!'"
            } else {
                return '';
            }
        case 'job_type':
            if (!value) {
                return "'Job Type!'"
            } else {
                return '';
            }
        case 'location':
            if (!value) {
                return "'Please Enter location!'"
            } else {
                return '';
            }
        case 'locationUrl':
            if (!value) {
                return "'Please input location Url!'"
            } else {
                return '';
            }
        case 'job_details':
            if (!value) {
                return "'Job Description!'"
            } else {
                return '';
            }
        case 'salary':
            if (!value) {
                return "'Salary ($)'"
            } else {
                return '';
            }
            case 'Education_level':
            if (!value) {
                return "'Please Select Education level!'"
            } else {
                return '';
            }
            case 'role_name':
            if (!value) {
                return "'Job Role!'"
            } else {
                return '';
            }
        default: {
            return null;
        }
    }
};


  const onSubmitJob=async()=>{
   let  allErrors={}
    Object.keys(jobpost).forEach(key => {
      const error = validation(key, jobpost[key])
      if (error && error.length) {
          allErrors[key] = error
      }

  });
  if (Object.keys(allErrors).length) {
      console.log(allErrors)
    return setValidation(allErrors)
} else {
  const result=await addJob(jobpost)
    console.log('result',result);
    if(result.data.status===200){
      message.success('sucessfull job created')
      history.push('/mapview2')
    }else{
      message.error('somthing wait wrrong')
    }
}

    
  }
    return(<>
<Header2/>
          
          <div class="job-post">
            <div class="container">
            <Link to='/mapview2'>
              <div class="back-link">
                {`<`} back
              </div>
              </Link>
              <div class="job-post-wrapper">
                <h2>Profile Settings</h2>
                <div class="job-post-inner">
                 <div class="job-top-field">
                  <input type="text" id="jobtitle" name="jobtitle" placeholder="Job Title" onChange={onHandaleJobpost}/>
                  <p className="text-danger-job">{Validation?.jobtitle || ""}</p>
                  
                </div>
                
                <div class="textarea-section job-flex" >
                  <textarea id="job_details" name="job_details" rows="10" cols="60" placeholder="jobdescription" onChange={onHandaleJobpost}/>
                  <p className="text-danger-job">{Validation?.job_details || ""}</p>
                </div>
                <div>
    <GooglePlacesAutocomplete
      apiKey="AIzaSyA1h0-QnzboBDfNQsYRebc-we-R4_tQwLk"
      selectProps={{
        locvalue,
          onChange: (e)=>(setJobpost({...jobpost,location:e?.label||''})),
        }}
    />
    <p className="text-danger-job">{Validation?.location || ""}</p>
  </div>
                <div class="job-loaction job-flex">
                    <input type="text" id="maplink" name="locationUrl" placeholder="Enter Google Maps links" onChange={onHandaleJobpost}/>
                  <p className="text-danger-job">{Validation?.locationUrl || ""}</p>
                </div>
                <div className='job-flex'>
                <input type="number" id="salary" name="salary" placeholder="salary" onChange={onHandaleJobpost}/>
                <p className="text-danger-job">{Validation?.salary || ""}</p>
</div>
                <div class="textarea-section job-flex">
                <select name="Education_level" id="qualifications" onChange={onHandaleJobpost}>
                        <option value="" disabled selected hidden >Education level</option>
                        <option value="Intermediate Education" >Intermediate Education</option>
                        <option value="Elementary Education" >Elementary Education</option>
                        <option value="Higher Education" >Higher Education</option>
                    </select>
                  <p className="text-danger-job">{Validation?.Education_level || ""}</p>

                </div>
                <div className='job-flex'>
                <input type="text" id="company_name" name="company_name" placeholder="company name" onChange={onHandaleJobpost}/>
                <p className="text-danger-job">{Validation?.company_name || ""}</p>
                    </div>
                    <div className='job-flex'>
                <input type="text" id="company_video" name="company_video" placeholder="company video" onChange={onHandaleJobpost}/>
                <p className="text-danger-job">{Validation?.company_video || ""}</p>
</div>
<div className='job-flex'>
                <select name="job_type" id="job_type-job" onChange={onHandaleJobpost}>
                        <option value="" disabled selected hidden >job type</option>
                        <option value="full time" >Full time</option>
                        <option value="harf time" >Part time</option>
                        <option value="contract" >Contract</option>
                        <option value="remote work" >Remote Work</option>
                    </select>
                  <p className="text-danger-job">{Validation?.job_type || ""}</p>
</div>
<div className='job-flex'>
                  <select name="role_name" id="role_name" onChange={onHandaleJobpost}>
                        <option value="" disabled selected hidden >job Role</option>
                        <option value="Employee" >Employee</option>
                        <option value="Developer" >Developer</option>
                        <option value="Vetor" >Vetor</option>
                        <option value="Worker" >Worker</option>
                    </select>
                  <p className="text-danger-job">{Validation?.role_name || ""}</p>
</div>
<div className='job-flex'>
                    <select name="job_category" id="job_category" onChange={onHandaleJobpost}>
                        <option value="" disabled selected hidden >job category</option>
                        {ctagary&&ctagary.map((item ,id)=>(<option value={item.label} key={id} >{item.label}</option>))}
                        
                    </select>
                  <p className="text-danger-job">{Validation?.job_category || ""}</p>
                  </div>
                  <div class="submit-btn" onClick={onSubmitJob}>
                      <span>Submit</span>
                  </div>
              </div>
              
            </div>
          </div>
        </div>

    </>)
}

export default Jobpost