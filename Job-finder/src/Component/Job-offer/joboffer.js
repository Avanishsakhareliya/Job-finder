import React,{useState,useEffect} from 'react'

import Header2 from '../Header-2/Header2'
import offer_delete from '../../assets/image/offer-delete.svg'
import Job_search_svg from '../../assets/image/job-search-svg.svg'
import {userViewJobOffer,deleteuserViewJobOffer} from '../Utils/_data'
import moment from 'moment';

import './joboffer.css'
import { message } from 'antd'
import { Link } from 'react-router-dom'


const Joboffer=()=>{
    const [Usernotify,setUsernotify]=useState([])
    const [UsernotifySearch,setUsernotifySearch]=useState([])
    const userData=JSON.parse(localStorage.getItem('User'))
    const [search,setsearch]=useState('')

    const getuserNotification=async()=>{
        const respons=await userViewJobOffer(userData._id)
        console.log('respons',respons)
 
        if(respons.data.status===200)
        {
            setUsernotify(respons.data.data.findOffer);
            setUsernotifySearch(respons.data.data.findOffer)
        }else{
            console.log('respons not found',respons)
        }
     }

     const keywordFlag = () => {
        if(search!==''){
            const searchByFilter = Usernotify && Usernotify.filter(item => (item.jobId.company_name.toLowerCase().includes(search.toLowerCase())) ||(item?.jobId?.jobtitle?.toLowerCase().includes(search.toLowerCase()))||
                (item.jobId.job_category.toLowerCase().includes(search.toLowerCase())))
        console.log('searchByFilter',searchByFilter)
            if (searchByFilter && searchByFilter.length > 0) {
                setUsernotifySearch(searchByFilter)
            } else {
                setUsernotifySearch([])
            }
            setsearch('');
        }else{
            setUsernotifySearch(Usernotify)
        }
    };

    const onHandalSearch=(e)=>{
        setsearch(e.target.value)
       }

     const ondeleteuserViewJobOffer=async(id)=>{
        const respons=await deleteuserViewJobOffer(id)
        console.log('respons not found',respons)
       
        if(respons.msg==='success')
              {
               message.success('successfull deleted notification')
               getuserNotification()
              }else{
                  console.log('respons not found',respons)
              }
           }


    useEffect(()=>{
        if(userData?.role==='Jobseeker'){
        getuserNotification()
        }
    document.getElementById("google_translate_element").classList.remove("mylanguage")

    },[])
    return<>
     <Header2/>  
     <div class="offer-section">
            <div class="container">
            <div class="back-link"><Link to="/mapview2">{`<`} back</Link></div>
              <div class="offer-content-section">
                    <h2 class="heading">My Offers</h2>
                    <div class="offer-content-inner">
                        <div class="row">
                            <div class="offer-search">
                                <input type="text" class="search-input" placeholder="Search by job title or company name," onChange={onHandalSearch} value={search}/>
                                <span type="submit" class="searchjobsubmit" onClick={keywordFlag}><img src={Job_search_svg} /></span>
                            </div>
                            <div class="filter-section">
                                <span class="filter-name">Filter by:</span>
                                <span class="filter-option">
                                  <select name="my-filter" id="my-filter">
                                    <option value="select" >Active</option>
                                    <option value="language1">Active</option>
                                    <option value="language2">Active</option>
                                  </select>
                                </span>
                            </div>
                        </div>
                        {
                            UsernotifySearch&&UsernotifySearch.map((item)=>(
                                <div class="offer-row">
                            <div class="offer-description">
                                <div class="left-part">
                                    <div class="name">{item.jobId.job_details}</div>
                                    <div class="company-name">{item.jobId.company_name}</div>
                                    <div class="location">{item.jobId.location}</div>
                                </div>
                                <div class="right-part">
                                    <div class="view-button">
                                        <Link to={`/continueapply/${item._id}`}>View Offer</Link>
                                    </div>
                                    <div class="date">
                                    {moment(item).format('MMM DD YYYY')}
                                    </div>
                                </div>
                            </div>
                            <div class="delete-icon">
                               <img src={offer_delete} onClick={()=>ondeleteuserViewJobOffer(item._id)}/>
                            </div>
                        </div>
                            ))
                        }
                        
                        
                    </div>
                </div>
            </div>
        </div>

     </>
}

export default Joboffer