import React, { useState, useEffect } from 'react'
import Header2 from '../Header-2/Header2'
import Field_icon1 from '../../assets/image/Field-icon1.svg'
import Field_icon2 from '../../assets/image/Field-icon2.svg'
import Field_icon3 from '../../assets/image/Field-icon3.svg'
import Field_icon4 from '../../assets/image/Field-icon4.svg'
import Field_icon5 from '../../assets/image/Field-icon5.svg'
import Field_icon6 from '../../assets/image/Field-icon6.svg'
import Field_icon7 from '../../assets/image/Field-icon7.svg'
import { Link } from "react-router-dom"
import { message } from 'antd';
import {getUserData} from '../Utils/_data'
import './Profilesetting.css'
import axios from 'axios'


const Profilesetting = () => {
    const [profile, setProfile] = useState({
        username: "",
        currentlocation: "",
        currentcity: "",
        exactlocation: "",
        dateofbirth: "",
        employeestatus: "",
        changeapplanguage: ""
    })
    const [Error, setError] = useState({
        e1: "",
        e2: "",
        e3: "",
        e4: "",
        e5: "",
        e6: "",
        check: false
    })
    const [btn, setbtn] = useState(false)
    function HandleChange(e) {
        setProfile({ ...profile, [e.target.name]: e.target.value })
        setbtn(true)

        // console.log("e--------",e.target.value);
    }
    function validation() {
        profile.username === "" ? setError((prev) => ({ ...prev, e1: "enter username", check: true })) : setError((prev) => ({ ...prev, e1: "", check: false }))
        profile.currentlocation === "" ? setError((prev) => ({ ...prev, e2: "enter currentlocation", check: true })) : setError((prev) => ({ ...prev, e2: "", check: false }))
        profile.currentcity === "" ? setError((prev) => ({ ...prev, e3: "enter currentcity", check: true })) : setError((prev) => ({ ...prev, e3: "", check: false }))
        profile.dateofbirth === "" ? setError((prev) => ({ ...prev, e4: "enter dateofbirth", check: true })) : setError((prev) => ({ ...prev, e4: "", check: false }))
        profile.employeestatus === "" ? setError((prev) => ({ ...prev, e5: "enter employeestatus", check: true })) : setError((prev) => ({ ...prev, e5: "", check: false }))
        profile.changeapplanguage === "" ? setError((prev) => ({ ...prev, e6: "enter changeapplanguage", check: true })) : setError((prev) => ({ ...prev, e6: "", check: false }))

    }
    const userData=JSON.parse(localStorage.getItem('User'))

    async function SubmitProfile() {
        
        validation()
        if (Error.check === false) {
            const ans = await axios.post(`https://api-job-finder.herokuapp.com/api/addprofileuserdetails/${userData._id}`, profile)
            if(ans){
                message.success('successfull Submit Profile')
            }else{
                message.error('somthing wait wrrong')
            }
            // console.log("ans-------", ans);
            setProfile({
                username: "",
                currentlocation: "",
                currentcity: "",
                exactlocation: "",
                dateofbirth: "",
                employeestatus: "",
                changeapplanguage: ""
            })
            setbtn(false)
            getUserDataProfile()
        }
    }

    const getUserDataProfile=async()=>{
const UserData=await getUserData(userData._id);
console.log('UserData',UserData)
if(UserData.data.status===200){
    const data=UserData?.data?.data?.finduser
    setProfile({
        username:data?.fullname ||"",
        currentlocation:data?.currentlocation ||"",
        currentcity: data?.currentcity||"",
        exactlocation:data?.exactlocation ||"",
        dateofbirth:data?.dateofbirth ||"",
        employeestatus: data?.employeestatus ||"",
        changeapplanguage: data?.changeapplanguage ||""
    })

}
    }

    useEffect(()=>{
        getUserDataProfile()
    },[])

    return <>
        <Header2 />

        <div class="profile-setting">
            <div class="container">
                <div class="back-link">
                    <Link to="/setting">{`<`} back</Link></div>
                <div class="profile-wrapper">
                    <h2>Profile Settings</h2>
                    <div class="profile-inner">
                        <div class="profile-field">
                            <div class="left-field">
                                <div class="icon">
                                    <img src={Field_icon1} />
                                </div>
                                <div class="name">Username</div>
                            </div>
                            <div class="right-field">
                                <input required type="text" id="username" name="username" value={profile.username} onChange={HandleChange} placeholder="Username" />
                                <span id='ee'>{Error.e1}</span>
                            </div>
                        </div>
                        <div class="profile-field">
                            <div class="left-field">
                                <div class="icon">
                                    <img src={Field_icon2} />
                                </div>
                                <div class="name">Current Position</div>
                            </div>
                            <div class="right-field">
                                <select name="currentlocation" id="currentlocation" onChange={HandleChange}>
                                    <option value="" disabled selected hidden >Select Current Position</option>
                                    <option value="Position1" >Position1</option>
                                    <option value="Position2" >Position2</option>
                                    <option value="Position3" >Position3</option>
                                </select>
                                <span id='ee'>{Error.e2}</span>
                            </div>
                        </div>
                        <div class="profile-field">
                            <div class="left-field">
                                <div class="icon">
                                    <img src={Field_icon3} />
                                </div>
                                <div class="name">Current City</div>
                            </div>
                            <div class="right-field">
                                <select name="currentcity" id="currentcity" onChange={HandleChange}>
                                    <option value="" disabled selected hidden >Select Current City</option>
                                    <option value="City1" >City1</option>
                                    <option value="City2" >City2</option>
                                    <option value="City3" >City3</option>
                                </select>
                                <span id='ee'>{Error.e3}</span>
                            </div>
                        </div>
                        <div class="profile-field">
                            <div class="left-field">
                                <div class="icon">
                                    <img src={Field_icon4} />
                                </div>
                                <div class="name">Exact location</div>
                            </div>
                            <div class="right-field">
                                <input type="url" id="googlelink" value={profile.exactlocation} name="exactlocation" onChange={HandleChange} placeholder="Google map link" />
                            </div>
                        </div>
                        <div class="profile-field">
                            <div class="left-field">
                                <div class="icon">
                                    <img src={Field_icon5} />
                                </div>
                                <div class="name">Date of Birth</div>
                            </div>
                            <div class="right-field">
                                <input type="date" id="date" value={profile.dateofbirth} onChange={HandleChange} name="dateofbirth" placeholder="select Date" />
                                <span id='ee'>{Error.e4}</span>
                                {/* <select name="city" id="city">
                                    <option value="" disabled selected hidden>DD /MM /YYYY</option>
                                    <option value="date1">22/5/1998</option>
                                    <option value="date2">22/5/1996</option>
                                    <option value="date3">22/5/1996</option>
                                </select> */}
                            </div>
                        </div>
                        <div class="profile-field">
                            <div class="left-field">
                                <div class="icon">
                                    <img src={Field_icon6} />
                                </div>
                                <div class="name">Employment Status</div>
                            </div>
                            <div class="right-field">
                                <select name="employeestatus" id="employeestatus" onChange={HandleChange}>
                                    <option value="" disabled selected hidden >Select employment status</option>
                                    <option value="status1" >status1</option>
                                    <option value="status2" >status2</option>
                                    <option value="status3" >status3</option>
                                </select>
                                <span id='ee'>{Error.e5}</span>
                            </div>
                        </div>
                        <div class="profile-field">
                            <div class="left-field">
                                <div class="icon">
                                    <img src={Field_icon7} />
                                </div>
                                <div class="name">Change app language</div>
                            </div>
                            <div class="right-field">
                                <select name="changeapplanguage" id="changeapplanguage" onChange={HandleChange}>
                                    <option value="" disabled selected hidden >Select Current Position</option>
                                    <option value="language1" >Language1</option>
                                    <option value="language2" >Language2</option>
                                    <option value="language3" >Language3</option>
                                </select>
                                <span id='ee'>{Error.e6}</span>
                            </div>
                        </div>
                        <div id='savebtn'>
                            {
                                btn && btn ?
                                    <button className='btnsave' style={{
                                        backgroundColor: "#1D4354", width: "40%", color: "#fff", padding: "9px 10px"
                                        , borderRadius: "50px", cursor: "pointer", border: "1px solid #1D4354", fontWeight: "700",
                                        fontSize: "17px", marginBottom: "25px"

                                    }} type="submit" name="submit-search" class="serach-button" onClick={SubmitProfile}>save</button>
                                    : null}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
}

export default Profilesetting