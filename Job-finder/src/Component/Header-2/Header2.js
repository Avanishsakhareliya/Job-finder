import React from "react";
import Login_img from '../../assets/image/main-logo.png'
import job_svg from '../../assets/image/job-svg.svg'
import massage from '../../assets/image/massage.svg'
import apply_svg from '../../assets/image/apply.svg'
import mobile_svg from '../../assets/image/mobile-user-svg.svg'
import mobile_setting_svg from '../../assets/image/mobile-setting.svg'
import Notification_img from '../../assets/image/notification.svg'
import User_img from '../../assets/image/user.svg'
import Menu_img from '../../assets/image/menu.svg'
import './Header2.css'
import { Link ,useHistory} from "react-router-dom";
import { message } from "antd";


const Header2 =()=>{
    const userData=JSON.parse(localStorage.getItem('User'))

    const history = useHistory()

    const onLogout=(e)=>{
        alert('you are sure logout account?')
        localStorage.setItem('Token','');
        localStorage.setItem('User',JSON.stringify({}));
        message.success('successfully Logout')
        history.push('/')
          }


    return<>
    <div class="main-section header">
        <div class="header-section">
            <div class="container">
                <div class="row">
                    <div class="logo">
                        <a href="#">
                            <img src={Login_img} alt="main-logo"/>
                        </a>
                    </div>
                    <div class="menu">
                        <ul class="nav-menu">
                            <li><Link to='/mapview1'>All Jobs</Link></li>
                            <li><Link to='/chat'>Messages</Link></li>
                            <li>{userData.role==='Jobseeker'?<Link to='/openoffer2'>My Applied jobs</Link>:<Link to='/openoffer'>My Applied jobs</Link>}</li>
                            <li><Link to='/mainprofilepage'>My Profile</Link></li>
                            <li><Link to='/setting'>Settings</Link></li>
                        </ul>
                    </div>
                    <div class="header-icon">
                        <span class="notification">
                            <Link to='/notifaction'> <img src={Notification_img} alt="notification-img"/></Link>
                        </span>
                        <span class="user">
                             <img src={User_img} alt="user-img"/>
                             <div class="dropdown-content">
                                    <a href="#" onClick={onLogout}>Log out</a>
                            </div>
                        </span>
                        <span class="menu-icon">
                                <img src={Menu_img} alt="menu-img" />
                                <div class="dropdown-content-menu">
                                {userData&& userData.role==='Employer'? <Link to="/jobpostlist" >job post list</Link>:''}
                                    {userData&& userData?.role==='Employer'? <Link to="/jobpost" >Job Post</Link>:''}
                                    {userData&& userData?.role==='Jobseeker'? <Link to='/jobapplication'>Job application</Link>:''}
                                    {userData&& userData?.role==='Jobseeker'?<Link to="/joboffer" >Job Offer</Link>:''}
                                    {userData&& userData?.role==='Jobseeker'?<Link to="/watchlist" >watch List</Link>:''}
                                </div>
                            </span>
                    </div>
                    <div class="mobile-header-icon">
                        <span class="notification">
                        <Link to='/notifaction'> <img src={Notification_img} alt="notification-img"/></Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mobile-header">
        <div class="menu">
            <ul class="nav-menu">
                <li>
                  <Link to='/mapview2'><img src={job_svg} />Jobs</Link>
                </li>
                <li><Link to='/chat'><img src={massage} />Messages</Link></li>
                <li>{userData.role==='Jobseeker'?<Link to='/openoffer2'><img src={apply_svg} />Applied jobs</Link>:<Link to='/openoffer'><img src={apply_svg} />Applied jobs</Link>}</li>
                <li><Link to='/mainprofilepage'><img src={mobile_svg} />Profile</Link></li>
                <li><Link to='/setting'><img src={mobile_setting_svg} />More</Link></li>
            </ul>
        </div>
    </div>
    </>
}
export default  Header2