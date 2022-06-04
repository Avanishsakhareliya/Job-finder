import React from 'react'
import Login from './Component/Login/Login';
import Register from './Component/register/Register';
import Signup1 from './Component/sign-up-1/Signup1';
import Signup2 from './Component/sign-up-2/Signup2';
import Mapview1 from './Component/map-view-1/Mapview1';
import Mapview2 from './Component/map-view-2/Mapview2';
import Mapview3 from './Component/map-view-3/Mapview3';
import Submitionapp from './Component/Submition-application/submitionapp';
import Jobdetails from './Component/Job-details/Jobdetails';
import Openoffer from './Component/Open-offer/Openoffer';
import Sucessfullypage from './Component/Sucessfully/Sucessfullypage';
import Congratulations from './Component/Congratulations/Congratulations';
import Continueapply from './Component/Continue-apply/Continueapply';
import Notifaction from './Component/Notifaction/Notifaction';
import Setting from './Component/Setting/Setting';
import Jobapplication from './Component/Job-application/jobapplication';
import Notificationsetting from './Component/Notification-setting/Notificationsetting';
import Privacysetting from './Component/Privacy-setting/Privacysetting';
import Profilesetting from './Component/Profile-setting/Profilesetting';
import Accountsetting from './Component/Account-setting/Accountsetting';
import Openoffer2 from './Component/Open-offer2/Openoffer2';
import Joboffer from './Component/Job-offer/joboffer';
import Mainprofilepage from './Component/Main-profile-page/mainprofilepage';
import Messages from './Component/Messages/messages';
import Jobpostlist from './Component/Job-posting-list/Jobpostinglist';
import Josubmituser from './Component/Jobsubmituser/Jobsubmituser';
import Jobseekerprofile from './Component/Jobseekerprofile/Jobseekerprofile'
import Jobpost from './Component/Job-Post/Jobpost'
import Chat from './Component/Chat/pages/Chat';
import PrivetRoute from './Privetroute'
import 'antd/dist/antd.css'
import { BrowserRouter as Router,
  Switch,
  Route,
  Link} from 'react-router-dom'

import './app.css'
import Notfound from './Component/Notfound';
import Watchlist from './Component/Watchlist/Watchlist';

const App=()=> {
  const userData=JSON.parse(localStorage.getItem('User'))||{}
  return (
    <>
    <Router  basename={'/Job-finder'}>
      <Switch>
      <Route path='/login' exact>
        <Login/>
      </Route>
      <Route path='/signup1' exact>
        <Signup1/>
      </Route>
      <Route path='/signup2' exact>
        <Signup2/>
      </Route>
      <PrivetRoute 
          path='/mapview1'
          Component={Mapview1} 
     />
      <PrivetRoute 
          path='/mapview2'
          Component={Mapview2} 
     />
      <PrivetRoute 
          path='/mapview3'
          Component={Mapview3} 
     />
      <PrivetRoute 
          path='/submitionapp/:jobId'
          Component={Submitionapp} 
     />
      <PrivetRoute 
          path='/jobdetails/:jobId'
          Component={Jobdetails} 
     />
      <PrivetRoute 
          path='/openoffer'
          Component={Openoffer} 
     />
      <PrivetRoute 
          path='/sucessfullypage'
          Component={Sucessfullypage} 
     />
      <PrivetRoute 
          path='/congratulations'
          Component={Congratulations} 
     />
      <PrivetRoute 
          path='/continueapply/:jobId'
          Component={Continueapply} 
     />
      <PrivetRoute 
          path='/notifaction'
          Component={Notifaction} 
     />
      <PrivetRoute 
          path='/setting'
          Component={Setting} 
     />
      <PrivetRoute 
          path='/jobapplication'
          Component={Jobapplication} 
     />
      <PrivetRoute 
          path='/notificationsetting'
          Component={Notificationsetting} 
     />
     <PrivetRoute 
          path='/privacysetting'
          Component={Privacysetting} 
     />
     <PrivetRoute 
          path='/profilesetting'
          Component={Profilesetting} 
     />
     <PrivetRoute 
          path='/accountsetting'
          Component={Accountsetting} 
     />
      <PrivetRoute 
          path='/openoffer2'
          Component={Openoffer2} 
     />
      <PrivetRoute 
          path='/joboffer'
          Component={Joboffer} 
     />
      <PrivetRoute 
          path='/mainprofilepage'
          Component={Mainprofilepage} 
     />
     <PrivetRoute 
          path='/messages'
          Component={Messages} 
     />
     <PrivetRoute 
          path='/chat'
          Component={Chat} 
     />
     <PrivetRoute 
          path='/jobpostlist'
          Component={Jobpostlist} 
     />
     <PrivetRoute 
          path='/jobsubmitionusers/:seekerId'
          Component={Josubmituser} 
     />
      <PrivetRoute 
          path='/jobseekerprofile/:seekerId'
          Component={Jobseekerprofile} 
     />
     <PrivetRoute 
          path='/watchlist'
          Component={Watchlist} 
     />
      {userData && userData.role==='Employer'?
      <PrivetRoute 
          path='/jobpost'
          Component={Jobpost} 
     />:null}
      <Route path='/' exact>
        <Register/>
      </Route>
      <Route>
        <Notfound/>
      </Route>
      </Switch>
    </Router>
      {/* <Login/> */}
      {/* <Register/> */}
    {/* <Signup1/> */}
    {/* <Signup2/> */}
    {/* <Mapview1/> */}
    {/* <Mapview2/> */}
    {/* <Mapview3/> */}
    {/* <Submitionapp/> */}
     {/* <Jobdetails/> */}
     {/* <Openoffer/> */}
     {/* <Sucessfullypage/> */}
       {/* <Congratulations/> */}
       {/* <Continueapply/> */}
       {/* <Notifaction/> */}
       {/* <Setting/> */}
       {/* <Jobapplication/> */}
       {/* <Notificationsetting/> */}
        {/* <Privacysetting  /> */}
        {/* <Profilesetting /> */}
        {/* <Accountsetting /> */}
        {/* <Openoffer2 /> */}
        {/* <Joboffer /> */}
         {/* <Mainprofilepage /> */}
        {/* <Messages/> */}

      </>
      );
}
export default App;