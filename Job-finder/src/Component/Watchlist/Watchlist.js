import React,{useState,useEffect} from 'react'
import Header2 from '../Header-2/Header2'
import map_image_job from '../../assets/image/map-image-job.png'
import Job_brand_svg from '../../assets/image/brand-svg-job.svg'
import Job_search_svg from '../../assets/image/job-search-svg.svg'
import job_filter_icon from '../../assets/image/job-filter-icon.svg'
import {getWatchList,deleteJobWatchkist} from '../Utils/_data'
import './watchlist.css'
import { Link } from 'react-router-dom'
import { message } from 'antd'

const Watchlist=()=>{
    const [offer,setOffer]=useState([])
    const userData=JSON.parse(localStorage.getItem('User'))
    const [search,setsearch]=useState('')
    const [offerSearch,setofferSearch]=useState([])
    
    const getApliedOffer=async()=>{
       const respons=await getWatchList(userData._id)
       console.log('respons',respons)
       if(respons.jobinfo.status===200)
       {
       setOffer(respons.jobinfo.data.finduser)
       setofferSearch(respons.jobinfo.data.finduser)
       }else{
           console.log('respons not found',respons)
       }
    }

    const deleteWatchlist=async(id)=>{
        const obj={
            AddUserId:userData._id,
            jobId:id
        }
const result=await deleteJobWatchkist(obj)
if(result.result.status===200){
message.success('delete successfull')
getApliedOffer()
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
                <div class="back-link"><Link to="/mapview2">{`<`} back</Link></div>
                <div class="job-details-wrapper">
                    <h2>My Watch List</h2>
                    <div class="serach-header">
                        <form class="search-form">
                            <input class="search-input" type="search" id="jobsearch" name="jobsearch" onChange={onHandalSearch} value={search}/>
                            <div class="job-search-btn" onClick={keywordFlag}><img src={Job_search_svg} /> </div>
                        </form>
                        
                    </div>
                    {offerSearch&& offerSearch.map((item)=>(<>
                        <div class="job-content-wrapper">
                     <div class="brand-logo">
                         <img src={Job_brand_svg} alt="logo"/>   
                     </div>
                      <div class="row">
                        <div class="left-section">
                            <h2 class="name">{item?.jobId?.jobtitle || 'OFFER: Job Title goes here'}</h2>
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
                        <Link to={`/submitionapp/${item?.jobId?._id}`}>
                            <div class="apply-button">
                                <a href="#">Applied</a>
                            </div>
                            </Link>
                            <div class="decline-offer" onClick={()=>deleteWatchlist(item?.jobId?._id)}>
                                <a href="#">Delete For WatchList</a>
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

export default Watchlist