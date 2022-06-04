import React, { useEffect, useState } from "react";
import Login_img from '../../assets/image/main-logo.png'
import Notification_img from '../../assets/image/notification.svg'
import User_img from '../../assets/image/user.svg'
import Menu_img from '../../assets/image/menu.svg'
import Location_img from '../../assets/image/location.svg'
import Search_img from '../../assets/image/search.svg'
import Svg_1_img from '../../assets/image/svg-1.svg'
import Svg_2_img from '../../assets/image/svg-2.svg'
import Svg_3_img from '../../assets/image/svg-3.svg'
import Filter_img from '../../assets/image/filter.svg'
import Sort_img from '../../assets/image/sort.svg'
import job_svg from '../../assets/image/job-svg.svg'
import massage from '../../assets/image/massage.svg'
import apply_svg from '../../assets/image/apply.svg'
import mobile_svg from '../../assets/image/mobile-user-svg.svg'
import mobile_setting_svg from '../../assets/image/mobile-setting.svg'
import { useHistory } from 'react-router-dom'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import './Header.css'
import { Link } from "react-router-dom";
import { message } from "antd";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};



const Header = (props) => {
    const userData = JSON.parse(localStorage.getItem('User'))
    const history = useHistory()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onLogout=(e)=>{
            alert('you are sure  logout account?')
            localStorage.setItem('Token','');
            localStorage.setItem('User',JSON.stringify({}))
            message.success('successfully Logout')
            history.push('/')
              }

    useEffect(() => {
        console.log("props", props)
    }, [])

    return (<>
        <div class="main-section">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 852 }}>
                    <div class="fliter-model">
                        <div class="filter-category">
                            <h2 class="filter-title">Category</h2>
                            <div class="main-category">
                                <span class={`filter-item ${props?.modalSort?.sortValue == 'Summer jobs' ? 'filter-active' : ''}`} name='Summer jobs' onClick={(e) => props.onHandalmodalSort('Category', e)}>Summer jobs (Featured <br />seasonal jobs)</span>
                                <span class={`filter-item ${props?.modalSort?.sortValue == 'Restaurants & Cafes' ? 'filter-active' : ''}`} name='Restaurants & Cafes' onClick={(e) => props.onHandalmodalSort('Category', e)}>Restaurants & Cafes</span>
                                <span class={`filter-item ${props?.modalSort?.sortValue == 'Salon & Spa' ? 'filter-active' : ''}`} name='Salon & Spa' onClick={(e) => props.onHandalmodalSort('Category', e)}>Salon & Spa</span>
                            </div>
                            <div class="sub-filter">
                                <span class={`filter-item ${props?.modalSort?.sortValue == 'Fitness' ? 'filter-active' : ''}`} name='Fitness' onClick={(e) => props.onHandalmodalSort('Category', e)}>Fitness</span>
                                <span class={`filter-item ${props?.modalSort?.sortValue == 'Hotels & hostels' ? 'filter-active' : ''}`} name='Hotels & hostels' onClick={(e) => props.onHandalmodalSort('Category', e)}>Hotels & hostels</span>
                                <span class={`filter-item ${props?.modalSort?.sortValue == 'Finance' ? 'filter-active' : ''}`} name='Finance' onClick={(e) => props.onHandalmodalSort('Category', e)}>Finance</span>
                                <span class={`filter-item ${props?.modalSort?.sortValue == 'Office & Admins' ? 'filter-active' : ''}`} name='Office & Admin' onClick={(e) => props.onHandalmodalSort('Category', e)}>Office & Admin</span>
                                <span class={`filter-item ${props?.modalSort?.sortValue == 'Healthcare' ? 'filter-active' : ''}`} name='Healthcare' onClick={(e) => props.onHandalmodalSort('Category', e)}>Healthcare</span>
                                <span class={`filter-item ${props?.modalSort?.sortValue == 'Sales & Marketing' ? 'filter-active' : ''}`} name='Sales & Marketing' onClick={(e) => props.onHandalmodalSort('Category', e)}>Sales & Marketing</span>
                                <span class={`filter-item ${props?.modalSort?.sortValue == 'Teaching' ? 'filter-active' : ''}`} name='Teaching' onClick={(e) => props.onHandalmodalSort('Category', e)}>Teaching</span>
                                <span class={`filter-item ${props?.modalSort?.sortValue == 'Transportation' ? 'filter-active' : ''}`} name='Transportation' onClick={(e) => props.onHandalmodalSort('Category', e)}>Transportation</span>
                                <span class={`filter-item ${props?.modalSort?.sortValue == 'Security' ? 'filter-active' : ''}`} name='Security' onClick={(e) => props.onHandalmodalSort('Category', e)}>Security</span>
                                <span class={`filter-item ${props?.modalSort?.sortValue == 'DIY' ? 'filter-active' : ''}`} name='DIY' onClick={(e) => props.onHandalmodalSort('Category', e)}>DIY</span>
                                <span class={`filter-item ${props?.modalSort?.sortValue == 'Retail' ? 'filter-active' : ''}`} name='Retail' onClick={(e) => props.onHandalmodalSort('Category', e)}>Retail</span>
                            </div>
                        </div>
                        <div class="filter-right-part">
                            <h2 class="filter-title">Posted by</h2>
                            <div class="main-category">
                                <span class={`filter-item ${props?.modalSort?.sortValue == 'Private Employer' ? 'filter-active' : ''}`} name='Private Employer' onClick={(e) => props.onHandalmodalSort('Postedby', e)}>Private Employer</span>
                                <span class={`filter-item ${props?.modalSort?.sortValue == 'Company' ? 'filter-active' : ''}`} name='Company' onClick={(e) => props.onHandalmodalSort('Postedby', e)}>Company</span>
                            </div>
                            <h2 class="filter-title">Education Level</h2>
                            <div class="main-category">
                                <span class={`filter-item ${props?.modalSort?.sortValue == 'None' ? 'filter-active' : ''}`} name='None' onClick={(e) => props.onHandalmodalSort('Postedby', e)}>None</span>
                                <span class={`filter-item ${props?.modalSort?.sortValue == 'Elementary Education' ? 'filter-active' : ''}`} name='Elementary Education' onClick={(e) => props.onHandalmodalSort('Education', e)}>Elementary Education</span>
                                <span class={`filter-item ${props?.modalSort?.sortValue == 'Intermediate Education' ? 'filter-active' : ''}`} name='Intermediate Education' onClick={(e) => props.onHandalmodalSort('Education', e)}>Intermediate Education</span>
                                <span class={`filter-item ${props?.modalSort?.sortValue == 'Higher Education' ? 'filter-active' : ''}`} name='Higher Education' onClick={(e) => props.onHandalmodalSort('Education', e)}>Higher Education</span>
                            </div>
                            <div class="filter-button">
                                <span class="clear" onClick={props.onClearFilter}>CLEAR FILTERS</span>
                                <span class="save" onClick={() => props.onFilterModale(setOpen)}>Save</span>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
            <div class="header-section">
                <div class="container">
                    <div class="row">
                        <div class="logo">
                            <a href="#">
                                <img src={Login_img} alt="main-logo" />
                            </a>
                        </div>
                        <div class="mobile-header-icon">
                            <span class="notification">
                                <img src={Notification_img} alt="notification-img" />
                            </span>
                        </div>
                        <div class="menu">
                            <ul class="nav-menu">
                                <li><Link to='/mapview1'>All Jobs</Link></li>
                                <li><Link to='/chat'>Messages</Link></li>
                                <li>{userData.role === 'Jobseeker' ? <Link to='/openoffer2'>My Applied jobs</Link> : <Link to='/openoffer'>My Applied jobs</Link>}</li>
                                <li><Link to='/mainprofilepage'>My Profile</Link></li>
                                <li><Link to='/setting'>Settings</Link></li>
                            </ul>
                        </div>
                        <div class="header-icon">
                            <span class="notification">
                                <Link to='/notifaction'> <img src={Notification_img} alt="notification-img" /></Link>
                            </span>
                            <span class="user">
                            <img src={User_img} alt="user-img" />                            
                            <div class="dropdown-content">
                                    <a href="#" onClick={onLogout}>Log out</a>
                            </div>
                            </span>
                            <span class="menu-icon">
                                <img src={Menu_img} alt="menu-img" />
                                <div class="dropdown-content-menu">
                                {userData&& userData.role==='Employer'? <Link to="/jobpostlist" >job post list</Link>:''}
                                    {userData&& userData.role==='Employer'? <Link to="/jobpost" >Job Post</Link>:''}
                                    {userData&& userData?.role==='Jobseeker'? <Link to='/jobapplication'>Job application</Link>:''}
                                    {userData&& userData?.role==='Jobseeker'?<Link to="/joboffer" >Job Offer</Link>:''}
                                    {userData&& userData?.role==='Jobseeker'?<Link to="/watchlist" >watch List</Link>:''}
                                </div>
                            </span>
                        </div>
                    </div>
                    <div class="search">
                        <div class="searchbox">
                            <div class="searchbox-location">
                                <img src={Location_img} alt="Location" />
                                <select name="search-category" id="search-category" value={props?.handaleCity} onChange={props?.onHandalcity}>
                                <option value=''>select contry</option>
                                {props?.cityList?.map((item)=>(<option value={item.name}>{item.name}</option>))}
                                </select>
                            </div>
                            <div class="input-wrapper">
                                <img src={Search_img} alt="Location" />
                                <input class="search-query form-control" type="text" name="search-query" placeholder="Search for available Jobs" onChange={props.onHandalSearch} value={props.search} />
                            </div>
                            <button type="submit" name="submit-search" class="serach-button" onClick={props.keywordFlag}>Search</button>
                        </div>
                        <div class="search-bottom-icon">
                            <div class="row">
                                <div class="left-icon">
                                    <img class="left-icon-svg-1" src={Svg_1_img} onClick={() => { history.push('mapview1') }} />
                                    <img class="svg-2" src={Svg_2_img} onClick={() => { history.push('mapview3') }} />
                                    <img src={Svg_3_img} onClick={() => { history.push('mapview2') }} />
                                </div>
                                <div class="right-icon">
                                    <div class="filter" onClick={handleOpen}>
                                        <img src={Filter_img} />
                                        <span>Filter</span>
                                    </div>
                                    <div class="sort-by">
                                        <img src={Sort_img} />
                                        <span onClick={props.onHandaleupDown}>Sort By</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mobile-top-header">
            <div class="mobile-top-section">
                <div class="search-name">Search</div>
                <div class="mobile-svg-right">
                    <img class="svg-2" src={Svg_2_img} onClick={() => { history.push('mapview3') }} />
                    <img src={Svg_3_img} onClick={() => { history.push('mapview2') }} />
                </div>
            </div>
            <div class="mobile-location">
                <div class="input-wrapper">
                    <img src={Location_img} alt="Location" />
                    <input class="location-query form-control" type="text" name="location-query" placeholder="Enter Location" onChange={props.onHandalSearch} value={props.search} />
                </div>
            </div>
            <div class="mobile-search-bottom-icon">
                <div class="filter"  onClick={handleOpen}>
                    <img src={Filter_img} />
                    <span>Filter</span>
                </div>
                <div class="sort-by" onClick={props.onHandaleupDown}>
                    <img src={Sort_img} />
                    <span>Sort By</span>
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
                    <li>{userData.role === 'Jobseeker' ? <Link to='/openoffer2'><img src={apply_svg} />Applied jobs</Link> : <Link to='/openoffer'><img src={apply_svg} />Applied jobs</Link>}</li>
                    <li><Link to='/mainprofilepage'><img src={mobile_svg} />Profile</Link></li>
                    <li><Link to='/setting'><img src={mobile_setting_svg} />More</Link></li>
                </ul>
            </div>
        </div>

    </>)
}

export default Header