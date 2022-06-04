import React,{useState,useEffect} from 'react'
import Header2 from '../Header-2/Header2'
import map_image_job from '../../assets/image/map-image-job.png'
import Job_brand_svg from '../../assets/image/brand-svg-job.svg'
import Job_search_svg from '../../assets/image/job-search-svg.svg'
import job_filter_icon from '../../assets/image/job-filter-icon.svg'
import {getSubmitUserData} from '../Utils/_data'
import './Openoffer2.css'

const Openoffer2=()=>{
    const [offer,setOffer]=useState([])
    const userData=JSON.parse(localStorage.getItem('User'))
    const [search,setsearch]=useState('')
    const [offerSearch,setofferSearch]=useState([])
    
    const getApliedOffer=async()=>{
       const respons=await getSubmitUserData(userData._id)
       if(respons.data.status===200)
       {
       setOffer(respons.data.data.data)
       setofferSearch(respons.data.data.data)
       }else{
           console.log('respons not found',respons)
       }
    }

    const onHandalSearch=(e)=>{
        setsearch(e.target.value)
       }


    const keywordFlag = () => {
        if(search!==''){
            const searchByFilter = offer && offer.filter(item => (item.jobId.company_name.toLowerCase().includes(search.toLowerCase())) ||(item?.jobId?.jobtitle?.toLowerCase().includes(search.toLowerCase()))||
                (item.jobId.job_category.toLowerCase().includes(search.toLowerCase())))
        console.log('searchByFilter',searchByFilter)
            if (searchByFilter && searchByFilter.length > 0) {
                setofferSearch(searchByFilter)
            } else {
                setofferSearch([])
            }
            setsearch('');
        }else{
            setofferSearch(offer)
        }
    };

    useEffect(()=>{
        getApliedOffer()
    document.getElementById("google_translate_element").classList.remove("mylanguage")

    },[])
    return<>
     <Header2 />  
     <div class="job-details job-open-offer my-applied-applications">
            <div class="container">
                <div class="back-link"><a href="#">{`<`} back</a></div>
                <div class="job-details-wrapper">
                    <h2>My applied applications</h2>
                    <div class="serach-header">
                        <form class="search-form">
                            <input class="search-input" type="search" id="jobsearch" name="jobsearch" onChange={onHandalSearch} value={search}/>
                            <div class="job-search-btn" onClick={keywordFlag}><img src={Job_search_svg} /> </div>
                        </form>
                        <div class="search-field">
                            <div class="row">
                                <div class="filter-icon">
                                    <img src={job_filter_icon} />
                                </div>
                                <div class="apply-link">
                                    <ul>
                                        <li><a href="#">All</a></li>
                                        <li><a href="#">Job Filled</a></li>
                                        <li><a href="#">Job Cancelled</a></li>
                                        <li><a href="#">Hired for the job</a></li>
                                    </ul>
                                </div>
                                <div class="mobile-apply-link">
                                  <img class="mobile-icon" src={job_filter_icon} />
                                    <select name="apply-link" id="apply-link">
                                        <option value="volvo">Job Cancelled</option>
                                        <option value="saab">Job Filled</option>
                                        <option value="mercedes">All</option>
                                        <option value="audi">Hired for the job</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    {offerSearch&& offerSearch.map((item)=>(<>
                        <div class="job-content-wrapper">
                     <div class="brand-logo">
                         <img src={Job_brand_svg} alt="logo"/>   
                     </div>
                      <div class="row">
                        <div class="left-section">
                            <h2 class="name">OFFER: Job Title goes here</h2>
                            <div class="company-name">{item?.jobId?.company_name}</div>
                            <div class="location">Location: {item?.jobId?.location}</div>
                            <div class="job-type">Jop Type: {item?.jobId?.job_type}</div>
                            <div class="salary">Salary: {item?.jobId?.salary}</div>
                            <div class="description">
                            <p> 
                            {item.jobId.job_details}
                            </p>
                        </div>
                            <div class="map">
                            <iframe src={`https://maps.google.com/maps?q=${item?.jobId?.lat}, ${item?.jobId?.lng}&z=15&output=embed`} height='300px' width={'400px'} frameborder="0"></iframe>  
                            </div>
                        </div>
                        <div class="right-section">
                            <div class="apply-button">
                                <a href="#">Applied</a>
                            </div>
                            <div class="decline-offer">
                                <a href="#">Job Cancelled</a>
                            </div>
                        </div>
                      </div>
                    </div>
                    </>))}
                   
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
                                goes here.Job description or details needed goes here. Job description or details needed goes here. Job description or details needed</p>

                                <p>Job description or details needed
                                goes here. Job description or details needed Job description or details needed goes here.Job description or details needed
                                </p>
                            </div>
                            <div class="map">
                                <img src={map_image_job} alt="map-image-job"/>   
                            </div>
                        </div>
                        <div class="right-section">
                            <div class="apply-button">
                                <a href="#">Applied</a>
                            </div>
                            <div class="decline-offer">
                                <a href="#">Job Cancelled</a>
                            </div>
                        </div>
                      </div>
                    </div> */}
                </div>
            </div>
        </div>
     </>
}

export default Openoffer2