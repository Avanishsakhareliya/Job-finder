import React,{useEffect,useState} from 'react'
import Header from '../Header/Header'
import Map_img from '../../assets/image/map-11.png'
import Brand_logo_1 from '../../assets/image/logo-11.png'
import svg_1 from '../../assets/image/map-svg-1.svg'
import Map_img1 from '../../assets/image/map-2.1.png'
import Map_img2 from '../../assets/image/map-2.2.png'
import axios from 'axios'
import moment from 'moment';


import './Mapview2.css'
import { Link } from 'react-router-dom'
import { Modal } from 'antd'

const Mapview2=()=>{
    const [jobdata,setJobdata]=useState([])
    const [sortjobdata,setsortJobdata]=useState([])
    const userData=JSON.parse(localStorage.getItem('User'))
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [video,setVideo]=useState('No recode found')
    const [search,setsearch]=useState('')
    const [upDown, setupDown] = useState(false);
    const [modalSort,setmodalSort]=useState({type:'',sortValue:''})
    const [curentpos,setcurentpos]=useState({lat:null,lng:null})
    const [cityList, setcityList] = useState([]);
    const [handaleCity, sethandalecity]=useState('')

    const showModal = (video) => {
      setIsModalVisible(true);
      setVideo(video)
    };

    const onHandalcity=(e)=>{
        sethandalecity(e.target.value)
       }
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
      setVideo('No recode found')
    };

    const keywordFlag = () => {
        if(search!=='' && handaleCity!==''){
         const searchByFilter = jobdata && jobdata.filter(item => (item?.company_name?.toLowerCase().includes(search.toLowerCase())) ||(item?.jobtitle?.toLowerCase().includes(search.toLowerCase()))||
         (item?.job_category?.toLowerCase().includes(search.toLowerCase())) && item.location.toLowerCase().includes(handaleCity.toLowerCase()))
 
         if (searchByFilter && searchByFilter.length > 0) {
             setJobdata(searchByFilter)
         } else {
             setJobdata([])
         }
         sethandalecity('');
         setsearch('');
      }
       if(search!==''){
             const searchByFilter = jobdata && jobdata.filter(item => (item?.company_name?.toLowerCase().includes(search.toLowerCase())) ||(item?.jobtitle?.toLowerCase().includes(search.toLowerCase()))||
                 (item?.job_category?.toLowerCase().includes(search.toLowerCase())))
         console.log('searchByFilter',searchByFilter)
             if (searchByFilter && searchByFilter.length > 0) {
                 setJobdata(searchByFilter)
             } else {
                 setJobdata([])
             }
             setsearch('');
         }else if(handaleCity!==''){
             const searchByFilter = jobdata && jobdata.filter(item => (item.location.toLowerCase().includes(handaleCity.toLowerCase())));
     console.log('searchByFilter',searchByFilter)
         if (searchByFilter && searchByFilter.length > 0) {
             setJobdata(searchByFilter)
         } else {
             setJobdata([])
         }
         sethandalecity('');
         }else{
             setJobdata(sortjobdata)
         }
     };

    const onFilterModale=(setOpen)=>{
        if(modalSort.type==='Category'){
            if(modalSort.sortValue!==''){
            const searchByFilter = jobdata && jobdata.filter(item => (item.job_category.toLowerCase().includes(modalSort.sortValue.toLowerCase())))
            if (searchByFilter && searchByFilter.length > 0) {
                setJobdata(searchByFilter)
            } else {
                setJobdata([])
            }
            setmodalSort({type:'',sortValue:''})
            setOpen(false)
            }else{
                setJobdata(sortjobdata)
            }
    
        }else if(modalSort.type==='Postedby'){
            if(modalSort.sortValue!==''){
            const searchByFilter =  jobdata && jobdata.filter(item => (item.postedBy.toLowerCase().includes(modalSort.sortValue.toLowerCase())))
            if (searchByFilter && searchByFilter.length > 0) {
                setJobdata(searchByFilter)
            } else {
                setJobdata([])
            }
        setmodalSort({type:'',sortValue:''})
        setOpen(false)
    
    
        }else{
            setJobdata(sortjobdata)
        }
        }else if(modalSort.type==='Education'){
            if(modalSort.sortValue!==''){
            const searchByFilter =  jobdata && jobdata.filter(item => (item.Education_level.toLowerCase().includes(modalSort.sortValue.toLowerCase())))
            if (searchByFilter && searchByFilter.length > 0) {
                setJobdata(searchByFilter)
            } else {
                setJobdata([])
            }
        setmodalSort({type:'',sortValue:''})
        setOpen(false)
    
        }else{
            setJobdata(sortjobdata)
        }
        }
       }

    const onGetJobData=async()=>{
        const token=localStorage.getItem('Token')
        const jobinfo=await axios({
            method: 'get',
            url: 'https://api-job-finder.herokuapp.com/api/getjobdata',
            headers: {"token":token}
          });
        console.log('jobinfo',jobinfo)
        if(jobinfo.status===200){
            setJobdata(jobinfo.data.getJobdata)
            setsortJobdata(jobinfo.data.getJobdata)
        }else{
            console.log("something wait wrong")
        }
    }
   


    const onHandalmodalSort=(type,e)=>{
        setmodalSort({type:type,sortValue:e.target.innerText})
       }
      

    const onGetDescJobData=async()=>{
        const token=localStorage.getItem('Token')
        const jobinfo=await axios({
            method: 'get',
            url: 'https://api-job-finder.herokuapp.com/api/getDescjobdata',
            headers: {"token":token}
          });
        if(jobinfo.status===200){
            setJobdata(jobinfo.data.getJobdata)
        }else{
            console.log("something wait wrong")
        }
    }

    const onHandaleupDown=()=>{
        if(curentpos?.lat && curentpos?.lng){
            function distance(lat1, lon1, lat2, lon2, unit) {

                var radlat1 = Math.PI * lat1/180
                var radlat2 = Math.PI * lat2/180
                var theta = lon1-lon2
                var radtheta = Math.PI * theta/180
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                  dist = 1;
                }
                dist = Math.acos(dist)
                dist = dist * 180/Math.PI
                dist = dist * 60 * 1.1515
                if (unit=="K") { dist = dist * 1.609344 }
                if (unit=="N") { dist = dist * 0.8684 }
         console.log('app k pas filter data agaya he',dist)

                return dist
              }
            let nearestdata=[]
              jobdata.map((item)=>{ 
                  if (distance(curentpos.lat, curentpos.lng, item.lat, item.lng, "K") <= 0.1) {
                    nearestdata.push(item)
            }})
            if(nearestdata.length>0){
                setJobdata(nearestdata);
            }else{
                setJobdata(sortjobdata);
            }

        }else{
        if(!upDown){
            onGetDescJobData()
            setupDown(!upDown)
        }else{
            onGetJobData()
            setupDown(!upDown)
        }
    }
    }

    const onHandalSearch=(e)=>{
        setsearch(e.target.value)
       }

       const onClearFilter=()=>{
        setmodalSort({type:'',sortValue:''})
        setJobdata(sortjobdata)
    
       }

       const onCurrentposition=()=>{
        const getLocation = () =>{
            const pos = {};
            const geolocation = navigator.geolocation;
            if (geolocation) {
               geolocation.getCurrentPosition(findLocal, showEror);
            }
            function findLocal(position){
               pos.lat = position.coords.latitude;
               pos.lng = position.coords.longitude;
            }
            function showEror(){console.log(Error)}
            return pos;
         };
         const myLocation = getLocation();
         setcurentpos(myLocation)
    }
    const getAllCity=async()=>{
//         const cityListData=await axios({
//             method: 'get',
//             url: 'https://www.universal-tutorial.com/api/getaccesstoken',
//             headers: {
//                 "Accept": "application/json",
//                 "api-token": "EV2lsZsAUX40o2Uuq-SOScuOCtzpWR6FjR47lcMOo8u7BEeNc6enPVWxQ5E-uhXwyRo",
//                 "user-email": "pgmpatel17@gmail.com"
//             }
//           }).then(async(result)=>{
//             const cityListresult=await axios({
//                 method: 'get',
//                 url: 'https://www.universal-tutorial.com/api/countries/',
//                 headers: {
//                     "Authorization": `Bearer ${result.data.auth_token}`,
//   "Accept": "application/json"
//                 }
//               })
//               if(cityListresult.status===200){
//                 setcityList(cityListresult.data)
//                  }
//             });
      const citylist=await axios({
        method: 'get',
        url: 'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json',
      }) 

      if(citylist.status===200){
        setcityList(citylist.data)
         }
      
      console.log('citylist',citylist)
    }

    useEffect(() => {
        onCurrentposition()
        onGetJobData()
        getAllCity()
    document.getElementById("google_translate_element").classList.remove("mylanguage")

    }, [])
    return<>
     <Header onHandalSearch={onHandalSearch} onHandaleupDown={onHandaleupDown} search={search} keywordFlag={keywordFlag}
          modalSort={modalSort}
          onHandalmodalSort={(type,e)=>onHandalmodalSort(type,e)}
            onClearFilter={onClearFilter}
            onFilterModale={(setOpen)=>(onFilterModale(setOpen))}
            cityList={cityList}
            onHandalcity={onHandalcity}
            handaleCity={handaleCity}
     />
    <div class="main-map-view map-view-list">
        <div class="container">
            <div class="map-left-view">
            {jobdata && jobdata.map((item,id)=>(<>
                <div class="image-content">
                    <div class="image-section">
                        <img src={Map_img} alt="image"/>  
                    </div>
                    <div class="content-section">
                        <div class="brand-logo">
                             <img src={Brand_logo_1} alt="image"/>
                        </div>
                        <div class="content">
                            <div class="svg-icon" onClick={()=>showModal(item.company_video)}>
                               <a href={'#'} ><img src={svg_1} /></a>
                            </div>
                            {userData.role=='Jobseeker'? <h2 class="name"><Link to={`/jobdetails/${item._id}`}>{item.role_name}</Link></h2>:<h2 class="name">{item.role_name}</h2>}
                            {userData.role=='Jobseeker'? <div class="company-name"><Link to={`/jobdetails/${item._id}`}>{item.company_name}</Link></div>:<div class="company-name">{item.company_name}</div>}
                            <div class="location">{item.location}</div>
                            <p class="description">
                            {item.job_details}</p>
                            <div class="bottom-content">
                                <div class="day">{moment(new Date(item.createdAt)).fromNow()} </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>))}

                <Modal  visible={isModalVisible} onCancel={handleCancel} footer={null}>
                        <iframe src={video} frameborder="0" width={'100%'} height={'300px'}></iframe>
                          </Modal>
                {/* <div class="image-content">
                    <div class="image-section">
                        <img src={Map_img1} alt="image"/>  
                    </div>
                    <div class="content-section">
                        <div class="brand-logo">
                             <img src={Brand_logo_1} alt="image"/>
                        </div>
                        <div class="content">
                            <div class="svg-icon">
                                <img src={svg_1} alt="image"/>
                            </div>
                            <h2 class="name">Role Name goes here</h2>
                            <div class="company-name">Company Name Goes here</div>
                            <div class="location">Location</div>
                            <p class="description">
                                Job description or details needed<br/> goes here. Job description or details needed Job description or details needed goes here.Job description or details needed goes here. Job description or details needed goes here.Job description or details needed goes here. Job description or details needed goes here. Job description or details needed                                                         
                            </p>
                            <div class="bottom-content">
                                <div class="day">2 days ago</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="image-content">
                    <div class="image-section">
                        <img src={Map_img2} alt="image"/>  
                    </div>
                    <div class="content-section">
                        <div class="brand-logo">
                             <img src={Brand_logo_1} alt="image"/>
                        </div>
                        <div class="content">
                            <div class="svg-icon">
                                <img src={svg_1} alt="image"/>
                            </div>
                            <h2 class="name">Role Name goes here</h2>
                            <div class="company-name">Company Name Goes here</div>
                            <div class="location">Location</div>
                            <p class="description">
                                Job description or details needed<br/> goes here. Job description or details needed Job description or details needed goes here.Job description or details needed goes here. Job description or details needed goes here.Job description or details needed goes here. Job description or details needed goes here. Job description or details needed                                                         
                            </p>
                            <div class="bottom-content">
                                <div class="day">2 days ago</div>
                            </div>
                        </div>
                    </div>
                </div>*/}
            </div>
        </div>
    </div> 

    <div class="border-bottom"></div>
    </>

}

export default Mapview2