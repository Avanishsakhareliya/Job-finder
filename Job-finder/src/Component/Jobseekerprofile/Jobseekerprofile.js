import React, {useEffect, useState} from "react";
import Header2 from "../Header-2/Header2";
import profile_img from "../../assets/image/profile-img.png";
import image1 from "../../assets/image/image1.png";
import image2 from "../../assets/image/image2.png";
import icon_profile from "../../assets/image/icon-profile.png";
import "./Jobseekerprofile.css";
import axios from "axios";
import {message} from "antd";
// import user_profile from "../../assets/image/User-Profile"
import user_profile from "../../assets/image/User-Profile.png";
import {Link, useParams} from "react-router-dom";
import {getJobprofile} from "../Utils/_data";

const Jobseekerprofile = () => {
  // const [profileUpload, setUpload] = useState({ img: '' });
  const [ecv, setEcv] = useState({
    img: "",
    desiredsalary: {
      From: "",
      To: "",
    },
    description: "",
    interest: "",
    Language: "",
    Locationinterest: "",
    ProfessionalSkill: "",
    SchedulePreference: "",
    jobrequirement: "",
  });
  const params = useParams();
  const [showProfile, setshowProfile] = useState(false);

  const [btn, setBtn] = useState(false);
  function profilePicUpload(e) {
    setEcv({...ecv, img: e.target.files[0]});
    setBtn(true);
  }
  function HandleChangeDec(e) {
    setEcv({...ecv, [e.target.name]: e.target.value});
    setBtn(true);
  }
  function HandleChangesalary(e) {
    setEcv({
      ...ecv,
      desiredsalary: {...ecv.desiredsalary, [e.target.name]: e.target.value},
    });
  }

  const userData = JSON.parse(localStorage.getItem("User"));

  const getUserprofile = async () => {
    const ans = await getJobprofile(params.seekerId);
    console.log("ans=========>", ans.data.data.data);
    if (ans?.data?.status === 200) {
      setEcv({
        img: ans?.data?.data?.data?.profileImg || "",
        desiredsalary: ans?.data?.data?.data?.desiredsalary || "",
        description: ans?.data?.data?.data?.description || "",
        interest: ans?.data?.data?.data?.interest || "",
        Language: ans?.data?.data?.data?.Language || "",
        Locationinterest: ans?.data?.data?.data?.Locationinterest || "",
        ProfessionalSkill: ans?.data?.data?.data?.professionalskills || "",
        SchedulePreference: ans?.data?.data?.data?.schedulepreference || "",
        jobrequirement: ans?.data?.data?.data?.jobrequirement || "",
        desiredsalary: ans?.data?.data?.data?.desiredsalary || "",
      });
    } else {
      setshowProfile(true)
    }
  };
  useEffect(() => getUserprofile() , []);


  return (
    <>
      <Header2 />
      <div class="profile-details-section">
        <div class="container">
          <div class="row">
            <div class="profile-left-section">
              <div class="profile-img">
                <img src={ecv.img || user_profile} alt="image" />
                <img
                  class="icon-profile"
                  htmlFor="image"
                  src={icon_profile}
                  alt="image"
                />
              </div>
              <div class="name">Name Family Name</div>
              <div class="cv-btn">
                <a href="#">E-CV</a>
              </div>
              <div class="interes-option">
                <h3>Section of Interest</h3>
                <div class="select-field">
                  <div class="select-field-item">
                    {/* <div class="name">Interest</div> */}

                    {/* <input type="checkbox" onChange={HandleChange} id="interest1" name="interest1" value="interest1" checked={ecv?.interest.filter(item=>(item=="interest1"))[0]?true:false}/> */}
                    <label for="interest" style={{fontSize: "15px"}}>
                      Interest
                    </label>
                  </div>
                  <div class="right-field">
                    <select
                      className="sel"
                      name="interest"
                      id="interest"
                      onChange={HandleChangeDec}
                      value={ecv.interest}
                      disabled
                    >
                      <option value="" disabled selected hidden>
                        Select Interest
                      </option>
                      <option value="interest1">interest1</option>
                      <option value="interest2">interest2</option>
                      <option value="interest3">interest3</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="requirement-option">
                <h3>Job Requirements</h3>
                <div class="select-field">
                  <div class="right-field">
                    <select
                      className="sel"
                      name="jobrequirement"
                      id="jobrequirement"
                      onChange={HandleChangeDec}
                      value={ecv.jobrequirement}
                      disabled
                    >
                      <option value="" disabled selected hidden>
                        Select job requirement
                      </option>
                      <option value="contract">contract</option>
                      <option value="permanent">permanent</option>
                      <option value="temporary">temporary</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="salary-option">
                <h3>Desired Salary</h3>
                <div
                  class="inner-name"
                  style={{display: "grid"}}
                  name="desiredsalary"
                >
                  From: $
                  <input
                    type="number"
                    id="num"
                    name="From"
                    onChange={(e) => HandleChangesalary(e)}
                    value={ecv.desiredsalary.From}
                    disabled
                  />{" "}
                  to ${" "}
                  <input
                    type="number"
                    id="num"
                    name="To"
                    value={ecv.desiredsalary.To}
                    onChange={(e) => HandleChangesalary(e)}
                    disabled
                  />
                </div>
              </div>
              <div class="location-option">
                <h3>Location of Interest</h3>
                <div class="inner-name">Country</div>
                <div class="right-field">
                  <select
                    className="sel"
                    name="Locationinterest"
                    id="Locationinterest"
                    onChange={HandleChangeDec}
                    value={ecv.Locationinterest}
                    disabled
                  >
                    <option value="" disabled selected hidden>
                      Select Country
                    </option>
                    <option value="Dubai">Dubai</option>
                    <option value="India">India</option>
                    <option value="US">US</option>
                    <option value="china">china</option>
                    <option value="canada">canada</option>
                    <option value="germany">germany</option>
                  </select>
                </div>
              </div>
              <div class="personal-skills">
                <h3>Professional Skills</h3>
                <div class="select-field">
                  <div class="select-field-item other">
                    <div class="right-field">
                      <select
                        className="sel"
                        name="ProfessionalSkill"
                        id="ProfessionalSkill"
                        onChange={HandleChangeDec}
                        value={ecv.ProfessionalSkill}
                        disabled
                      >
                        <option value="" disabled selected hidden>
                          Select ProfessionalSkill{" "}
                        </option>
                        <option value="skill1">skill1</option>
                        <option value="skill2">skill2</option>
                        <option value="skill3">skill3</option>
                        <option value="skill4">skill4</option>
                        <option value="skill5">skill5</option>
                        <option value="skill6">skill6</option>
                        <option value="skill7">skill7</option>
                        <option value="skill8">skill8</option>
                        <option value="skill9">skill9</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="languages-option">
                <h3>Language</h3>
                <div class="select-field">
                  <div class="right-field">
                    <select
                      className="sel"
                      name="Language"
                      id="Language"
                      onChange={HandleChangeDec}
                      value={ecv.Language}
                      disabled
                    >
                      <option value="" disabled selected hidden>
                        Select Language
                      </option>
                      <option value="language1">language1</option>
                      <option value="language2">language2</option>
                      <option value="language3">language3</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="schedule-option">
                <h3>Schedule Preference</h3>
                <div class="select-field other">
                  <div class="right-field">
                    <select
                      className="sel"
                      name="SchedulePreference"
                      id="SchedulePreference"
                      onChange={HandleChangeDec}
                      value={ecv.SchedulePreference}
                      disabled
                    >
                      <option value="" disabled selected hidden>
                        Select SchedulePreference
                      </option>
                      <option value="fulltime">full time</option>
                      <option value="parttime">part time</option>
                      <option value="hourly">hourly</option>
                      <option value="avlholiday">avlholiday</option>
                      <option value="avlnight">avlnight</option>
                      <option value="casual">casual</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="profile-right-section">
              <div class="achievement-section">
                <textarea
                  id="achievement"
                  name="description"
                  rows="20"
                  value={ecv.description}
                  onChange={HandleChangeDec}
                  disabled
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip
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
  );
};

export default Jobseekerprofile;
