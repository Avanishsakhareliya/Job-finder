import React, { useEffect, useState } from 'react'
import Header2 from '../Header-2/Header2'
import profile_img from '../../assets/image/profile-img.png'
import image1 from '../../assets/image/image1.png'
import image2 from '../../assets/image/image2.png'
import icon_profile from '../../assets/image/icon-profile.png'
import './mainprofilepage.css'
import axios from 'axios'
import { message } from 'antd';
// import user_profile from "../../assets/image/User-Profile"
import { Tabs } from 'antd';

import user_profile from "../../assets/image/User-Profile.png"
const { TabPane } = Tabs;
const Mainprofilepage = () => {

    // const [profileUpload, setUpload] = useState({ img: '' });
    const [ecv, setEcv] = useState({
        img: '',
        desiredsalary: {
            From: "", To: ""
        },
        description: '',
        interest: '',
        Language: '',
        Locationinterest: '',
        ProfessionalSkill: '',
        SchedulePreference: '',
        jobrequirement: ''
    })

    const [btn, setBtn] = useState(false)
    function profilePicUpload(e) {
        setBtn(true)

        let storeFiles = ""
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = async () => {
            const base64String = reader.result
            storeFiles = base64String
        setEcv({ ...ecv, img: storeFiles })

        }

    }
    function HandleChangeDec(e) {

        setEcv({ ...ecv, [e.target.name]: e.target.value })
        setBtn(true)

    }
    function HandleChangesalary(e) {
        setEcv({ ...ecv, desiredsalary: { ...ecv.desiredsalary, [e.target.name]: e.target.value } })

    }

    const userData = JSON.parse(localStorage.getItem('User'))

    const getUserprofile = async () => {
        const ans = await axios.get(`https://api-job-finder.herokuapp.com/api/getuserprofile/${userData._id}`)
        console.log("ans---------", ans.data);
        if (ans.status == 200) {
            setEcv({
                img: ans?.data?.data?.profileImg || '',
                desiredsalary: ans?.data?.data?.desiredsalary || '',
                description: ans?.data?.data?.description || '',
                interest: ans?.data?.data?.interest || '',
                Language: ans?.data?.data?.Language || '',
                Locationinterest: ans?.data?.data?.Locationinterest || '',
                ProfessionalSkill: ans?.data?.data?.professionalskills || '',
                SchedulePreference: ans?.data?.data?.schedulepreference || '',
                jobrequirement: ans?.data?.data?.jobrequirement || '',
                desiredsalary: ans?.data?.data?.desiredsalary || ''

            })
        } else {
            console.log('somthing wrong ecv')

        }
    }
    useEffect(() => {
        getUserprofile()
    document.getElementById("google_translate_element").classList.remove("mylanguage")
    }, [])

    async function SubmitData() {
        // const convertedImage = await Convert(ecv.img)
        // setEcv({ ...ecv, img: convertedImage })
    
            const result = await axios.post(`https://api-job-finder.herokuapp.com/api/userprofile/${userData._id}`, ecv)
            if (result.status === 200) {
                console.log('successfull create ecv')
                message.success('successfull create ecv')
                getUserprofile()
            } else {
                console.log('somthing wrong ecv')
                message.warning('something went wrong')

            }
            console.log("ecv-", result);

    }
    function callback(key) {
        console.log(key);
      }

    return <>
        <Header2 />
        <div class="profile-details-section">
            <div class="container">
            <div class="mobile-section">
               <div class="mobile-profile-section">
                    <div class="profile-img">
                        <input id='image' type="file" style={{ display: 'none' }} onChange={profilePicUpload} />
                        <img src={ecv.img || user_profile} alt="image" />
                        <label htmlFor='image' className='icon-profile'>
                            <img class="" htmlFor='image' src={icon_profile} alt="image" />
                        </label>
                    </div>
                 <div class="name">Nagham Ghanem</div>
                 <div class="location">KSA,Riyadh</div>
               </div>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Intro" key="1">
                     <div class="profile-intro">
                       <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"</p>
                       <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"</p>
                     </div>
                    </TabPane>
                    <TabPane tab="E-CV" key="2">
                    <div class="profile-left-section">
                        <div class="interes-option">
                            <h3>Section of Interest</h3>
                            <div class="select-field">
                                <div class="select-field-item">
                                    {/* <div class="name">Interest</div> */}

                                    {/* <input type="checkbox" onChange={HandleChange} id="interest1" name="interest1" value="interest1" checked={ecv?.interest.filter(item=>(item=="interest1"))[0]?true:false}/> */}
                                    <label for="interest" style={{ fontSize: "15px" }}>Interest</label>
                                </div>
                                <div class="right-field">
                                    <select className='sel' name="interest" id="interest" onChange={HandleChangeDec} value={ecv.interest}>
                                        <option value="" disabled selected hidden >Select Interest</option>
                                        <option value="interest1" >interest1</option>
                                        <option value="interest2" >interest2</option>
                                        <option value="interest3" >interest3</option>
                                    </select>
                                </div>

                            </div>

                        </div>
                        <div class="requirement-option">
                            <h3>Job Requirements</h3>
                            <div class="select-field">
                                <div class="right-field">
                                    <select className='sel' name="jobrequirement" id="jobrequirement" onChange={HandleChangeDec} value={ecv.jobrequirement}>
                                        <option value="" disabled selected hidden >Select job requirement</option>
                                        <option value="contract" >contract</option>
                                        <option value="permanent" >permanent</option>
                                        <option value="temporary" >temporary</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="salary-option">
                            <h3>Desired Salary</h3>
                            <div class="inner-name" style={{ display: "grid" }} name="desiredsalary">From:   $<input type='number' id='num' name='From' onChange={(e) => HandleChangesalary(e)} value={ecv.desiredsalary.From} />  to  $ <input type='number' id='num' name='To' value={ecv.desiredsalary.To} onChange={(e) => HandleChangesalary(e)} /></div>
                        </div>
                        <div class="location-option">
                            <h3>Location of Interest</h3>
                            <div class="inner-name">Country</div>
                            <div class="right-field">
                                <select className='sel' name="Locationinterest" id="Locationinterest" onChange={HandleChangeDec} value={ecv.Locationinterest}>
                                    <option value="" disabled selected hidden >Select Country</option>
                                    <option value="Dubai" >Dubai</option>
                                    <option value="India" >India</option>
                                    <option value="US" >US</option>
                                    <option value="china" >china</option>
                                    <option value="canada" >canada</option>
                                    <option value="germany" >germany</option>
                                </select>
                            </div>
                        </div>
                        <div class="personal-skills">
                            <h3>Professional Skills</h3>
                            <div class="select-field">
                                <div class="select-field-item other">

                                    <div class="right-field">
                                        <select className='sel' name="ProfessionalSkill" id="ProfessionalSkill" onChange={HandleChangeDec} value={ecv.ProfessionalSkill}>
                                            <option value="" disabled selected hidden >Select ProfessionalSkill </option>
                                            <option value="skill1" >skill1</option>
                                            <option value="skill2" >skill2</option>
                                            <option value="skill3" >skill3</option>
                                            <option value="skill4" >skill4</option>
                                            <option value="skill5" >skill5</option>
                                            <option value="skill6" >skill6</option>
                                            <option value="skill7" >skill7</option>
                                            <option value="skill8" >skill8</option>
                                            <option value="skill9" >skill9</option>
                                        </select>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="languages-option">
                            <h3>Language</h3>
                            <div class="select-field">
                                <div class="right-field">
                                    <select className='sel' name="Language" id="Language" onChange={HandleChangeDec} value={ecv.Language}>
                                        <option value="" disabled selected hidden >Select Language</option>
                                        <option value="language1" >language1</option>
                                        <option value="language2" >language2</option>
                                        <option value="language3" >language3</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                        <div class="schedule-option">
                            <h3>Schedule Preference</h3>
                            <div class="select-field other">
                                <div class="right-field">
                                    <select className='sel' name="SchedulePreference" id="SchedulePreference" onChange={HandleChangeDec}
                                        value={ecv.SchedulePreference}>
                                        <option value="" disabled selected hidden >Select SchedulePreference</option>
                                        <option value="fulltime" >full time</option>
                                        <option value="parttime" >part time</option>
                                        <option value="hourly" >hourly</option>
                                        <option value="avlholiday" >avlholiday</option>
                                        <option value="avlnight" >avlnight</option>
                                        <option value="casual" >casual</option>
                                    </select>
                                </div>
                            </div>
                            {
                                 btn === true ?
                                    <div style={{ textAlign: "center" }}>
                                        <button className='btnsave' style={{
                                            backgroundColor: "#1D4354", width: "40%", color: "#fff", padding: "9px 10px"
                                            , borderRadius: "50px", cursor: "pointer", border: "1px solid #1D4354", fontWeight: "700",
                                            fontSize: "17px", marginBottom: "25px"

                                        }} type="submit" name="submit-search" class="serach-button" onClick={SubmitData}>save</button>
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                    </TabPane>
                    <TabPane tab="Achievements" key="3">
                    <div class="profile-right-section">
                        <div class="gallary-section">
                            <div class="row">
                                <div class="image-item">
                                    <img src={image1} alt="image" />
                                </div>
                                <div class="image-item">
                                    <img src={image1} alt="image" />
                                </div>
                                <div class="image-item">
                                    <img src={image1} alt="image" />
                                </div>
                                <div class="image-item">
                                    <img src={image2} alt="image" />
                                </div>
                                <div class="image-item">
                                    <img src={image2} alt="image" />
                                </div>
                                <div class="image-item">
                                    <img src={image2} alt="image" />
                                </div>
                            </div>
                        </div>
                    </div>
                    </TabPane>
                </Tabs>
            </div>
                <div class="row desktop-section">
                    <div class="profile-left-section">
                        <div class="profile-img">
                            <input id='image' type="file" style={{ display: 'none' }} onChange={profilePicUpload} />
                            <img src={ecv.img || user_profile} alt="image" />
                            <label htmlFor='image' className='icon-profile'>
                                <img class="" htmlFor='image' src={icon_profile} alt="image" />
                            </label>
                        </div>
                        {userData&&userData.role==='Employer'?<div class="Company-name">Company Name</div>:<div class="name">Name Family Name</div>}
                        {userData&&userData.role==='Employer'?
                        '':<div class="cv-btn">
                            <a href="#" onClick={SubmitData}>E-CV</a>
                        </div>}
                        
                        {userData&&userData.role==='Employer'?<>
                        <div class='main-heading-containt'>
                             <div class='heading-text'>Phone number</div>
                             <div class='subheading-text'>{userData?.mobileNumber}</div>
                        </div>
                        <div class='main-heading-containt'>
                             <div class='heading-text'>Email</div>
                             <div class='subheading-text'>{userData?.email}</div>
                        </div>
                        <div class='main-heading-containt'>
                             <div class='heading-text'>Website</div>
                             <div class='subheading-text'>Website.com</div>
                        </div>
                        <div class='main-heading-containt'>
                             <div class='heading-text'>address</div>
                             <div class='subheading-text'>{userData?.currentlocation}</div>
                        </div>
                        {
                                 btn === true ?
                                    <div style={{ textAlign: "center" }}>
                                        <button className='btnsave' style={{
                                            backgroundColor: "#1D4354", width: "40%", color: "#fff", padding: "9px 10px"
                                            , borderRadius: "50px", cursor: "pointer", border: "1px solid #1D4354", fontWeight: "700",
                                            fontSize: "17px", marginBottom: "25px"

                                        }} type="submit" name="submit-search" class="serach-button" onClick={SubmitData}>save</button>
                                    </div>
                                    : null
                            }
                        </>:<>
                        <div class="interes-option">
                            <h3>Section of Interest</h3>
                            <div class="select-field">
                                <div class="select-field-item">
                                    {/* <div class="name">Interest</div> */}

                                    {/* <input type="checkbox" onChange={HandleChange} id="interest1" name="interest1" value="interest1" checked={ecv?.interest.filter(item=>(item=="interest1"))[0]?true:false}/> */}
                                    <label for="interest" style={{ fontSize: "15px" }}>Interest</label>
                                </div>
                                <div class="right-field">
                                    <select className='sel' name="interest" id="interest" onChange={HandleChangeDec} value={ecv.interest}>
                                        <option value="" disabled selected hidden >Select Interest</option>
                                        <option value="interest1" >interest1</option>
                                        <option value="interest2" >interest2</option>
                                        <option value="interest3" >interest3</option>
                                    </select>
                                </div>

                            </div>

                        </div>
                        <div class="requirement-option">
                            <h3>Job Requirements</h3>
                            <div class="select-field">
                                <div class="right-field">
                                    <select className='sel' name="jobrequirement" id="jobrequirement" onChange={HandleChangeDec} value={ecv.jobrequirement}>
                                        <option value="" disabled selected hidden >Select job requirement</option>
                                        <option value="contract" >contract</option>
                                        <option value="permanent" >permanent</option>
                                        <option value="temporary" >temporary</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="salary-option">
                            <h3>Desired Salary</h3>
                            <div class="inner-name" style={{ display: "grid" }} name="desiredsalary">From:   $<input type='number' id='num' name='From' onChange={(e) => HandleChangesalary(e)} value={ecv.desiredsalary.From} />  to  $ <input type='number' id='num' name='To' value={ecv.desiredsalary.To} onChange={(e) => HandleChangesalary(e)} /></div>
                        </div>
                        <div class="location-option">
                            <h3>Location of Interest</h3>
                            <div class="inner-name">Country</div>
                            <div class="right-field">
                                <select className='sel' name="Locationinterest" id="Locationinterest" onChange={HandleChangeDec} value={ecv.Locationinterest}>
                                    <option value="" disabled selected hidden >Select Country</option>
                                    <option value="Dubai" >Dubai</option>
                                    <option value="India" >India</option>
                                    <option value="US" >US</option>
                                    <option value="china" >china</option>
                                    <option value="canada" >canada</option>
                                    <option value="germany" >germany</option>
                                </select>
                            </div>
                        </div>
                        <div class="personal-skills">
                            <h3>Professional Skills</h3>
                            <div class="select-field">
                                <div class="select-field-item other">

                                    <div class="right-field">
                                        <select className='sel' name="ProfessionalSkill" id="ProfessionalSkill" onChange={HandleChangeDec} value={ecv.ProfessionalSkill}>
                                            <option value="" disabled selected hidden >Select ProfessionalSkill </option>
                                            <option value="skill1" >skill1</option>
                                            <option value="skill2" >skill2</option>
                                            <option value="skill3" >skill3</option>
                                            <option value="skill4" >skill4</option>
                                            <option value="skill5" >skill5</option>
                                            <option value="skill6" >skill6</option>
                                            <option value="skill7" >skill7</option>
                                            <option value="skill8" >skill8</option>
                                            <option value="skill9" >skill9</option>
                                        </select>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="languages-option">
                            <h3>Language</h3>
                            <div class="select-field">
                                <div class="right-field">
                                    <select className='sel' name="Language" id="Language" onChange={HandleChangeDec} value={ecv.Language}>
                                        <option value="" disabled selected hidden >Select Language</option>
                                        <option value="language1" >language1</option>
                                        <option value="language2" >language2</option>
                                        <option value="language3" >language3</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                        <div class="schedule-option">
                            <h3>Schedule Preference</h3>
                            <div class="select-field other">
                                <div class="right-field">
                                    <select className='sel' name="SchedulePreference" id="SchedulePreference" onChange={HandleChangeDec}
                                        value={ecv.SchedulePreference}>
                                        <option value="" disabled selected hidden >Select SchedulePreference</option>
                                        <option value="fulltime" >full time</option>
                                        <option value="parttime" >part time</option>
                                        <option value="hourly" >hourly</option>
                                        <option value="avlholiday" >avlholiday</option>
                                        <option value="avlnight" >avlnight</option>
                                        <option value="casual" >casual</option>
                                    </select>
                                </div>
                            </div>
                            {
                                btn && btn === true ?
                                    <div style={{ textAlign: "center" }}>
                                        <button className='btnsave' style={{
                                            backgroundColor: "#1D4354", width: "40%", color: "#fff", padding: "9px 10px"
                                            , borderRadius: "50px", cursor: "pointer", border: "1px solid #1D4354", fontWeight: "700",
                                            fontSize: "17px", marginBottom: "25px"

                                        }} type="submit" name="submit-search" class="serach-button" onClick={SubmitData}>save</button>
                                    </div>
                                    : null
                            }
                        </div>
                        </>}
                        
                    </div>
                    <div class="profile-right-section">
                        <div class="achievement-section">
                            <textarea id="achievement" name="description" rows="20" value={ecv.description} onChange={HandleChangeDec}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                            </textarea>
                            <div class="achievement-button">
                                <a href="#">My Achievements</a>
                            </div>
                        </div>
                        <div class="gallary-section">
                            <div class="row">
                                <div class="image-item">
                                    <img src={image1} alt="image" />
                                </div>
                                <div class="image-item">
                                    <img src={image1} alt="image" />
                                </div>
                                <div class="image-item">
                                    <img src={image1} alt="image" />
                                </div>
                                <div class="image-item">
                                    <img src={image2} alt="image" />
                                </div>
                                <div class="image-item">
                                    <img src={image2} alt="image" />
                                </div>
                                <div class="image-item">
                                    <img src={image2} alt="image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export default Mainprofilepage