import React,{useState,useEffect} from 'react'
import Header from '../Header/Header'
import './Mapview3.css'
import axios from 'axios'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps"
import jobicon from '../../assets/image/jobicon2.png'
import moment from 'moment';



export const ArticlesMap = withScriptjs(withGoogleMap((props) => {

    // const markers = props.articles.map( article =>
    //               <ArticleMarker
    //                 key={article.uid}
    //                 doctor={article}
    //                 location={{lat: article.closestArticle.lat, lng: article.closestArticle.lon}}
    //               />);
    const [jobDetail,setJobDetail]=useState({activeMarker:{},isOpen:true,jobDetail:{}})



   const onMarkerClicked= (data, marker) => (setJobDetail({
        activeMarker: {lat: data?.latLng?.lat(), lng: data?.latLng?.lng()},
        isOpen: true,
        jobDetail: {
            role_name: marker?.role_name,
            company_name: marker?.company_name,
            location: marker?.location,
            job_details: marker?.job_details,
            ago:moment(new Date(marker.createdAt)).fromNow()
        }
      }))

      const onToggleOpen=()=>{
        setJobDetail({...jobDetail,isOpen:false})
      }

          return (<>
        <GoogleMap
            defaultZoom={14}
            center={{ lat: 42.3601, lng: -71.0589 }}
            onClick={(e)=>{console.log("e.latLng.lat()",e.latLng.lat(),"e.latLng.lng()",e.latLng.lng())}}
        >
            {props?.jobdata?.map((item)=>(<><Marker
              defaultZoomOnClick={4}
              icon={jobicon} 
              onMouseOver={(data) => onMarkerClicked(data, item)}
              key={item._id}
              position={{lat: parseFloat(item?.lat), lng: parseFloat(item?.lng)}}
            /></>))}
        </GoogleMap>
        {jobDetail?.activeMarker?.lat && jobDetail.isOpen  &&
            <InfoWindow position={{lat: jobDetail?.activeMarker?.lat, lng: jobDetail?.activeMarker?.lng}}
                        onCloseClick={onToggleOpen}>
              <div className="detailCard">
                <div className="d-flex main-div">
                  <div className="d-inline-block">
                    <div className="text-black name">Role name : <span
                      className="gray-normal role-name">{jobDetail?.jobDetail?.role_name}</span></div>
                    <div className="text-black location">Location Identifier : <span
                      className="gray-normal adrress">{jobDetail?.jobDetail?.location}</span></div>
                    <div className="text-black date"><span
                      className="gray-normal">{jobDetail.jobDetail.ago}</span>
                    </div>
                    
                  </div>
                  <div className="rightArrowDiv">
                    {/* <img src={rightArrow} className="cursor-pointer" alt="cross icon"/> */}
                  </div>
                </div>
              </div>
            </InfoWindow>}
            </>
    );
}
))

const Mapview3=()=>{
    const [jobdata,setJobdata]=useState([])
    const [sortjobdata,setsortJobdata]=useState([])
    const [modalSort,setmodalSort]=useState({type:'',sortValue:''})

    const [upDown, setupDown] = useState(false);
    const [search,setsearch]=useState('')
    const [curentpos,setcurentpos]=useState({lat:null,lng:null})
    const [cityList, setcityList] = useState([]);
    const [handaleCity, sethandalecity]=useState('')
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
  const onHandalcity=(e)=>{
    sethandalecity(e.target.value)
   }

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

  const onClearFilter=()=>{
    setmodalSort({type:'',sortValue:''})
    setJobdata(sortjobdata)


    
   }


  const onHandalSearch=(e)=>{
    setsearch(e.target.value)
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
    const citylist=await axios({
        method: 'get',
        url: 'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json',
      }) 

      if(citylist.status===200){
        setcityList(citylist.data)
         }

       
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
            onClearFilter={onClearFilter}
            onFilterModale={(setOpen)=>(onFilterModale(setOpen))}
            cityList={cityList}
            onHandalcity={onHandalcity}
            handaleCity={handaleCity}
     />  
        <div class="main-map-view map-only">
            <div class="container">
                <div class="map-right-view">
                    <div class="map-inner">
                    <ArticlesMap
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1h0-QnzboBDfNQsYRebc-we-R4_tQwLk&&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{height: '100%'}} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                onClick={(ev)=>{console.log(ev)}}
                               jobdata={jobdata}
                            />
                    </div>
                </div>
            </div>
        </div>

        <div class="border-bottom"></div>
     </>
}

export default Mapview3