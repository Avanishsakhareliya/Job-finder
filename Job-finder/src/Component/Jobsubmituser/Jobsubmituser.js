import React, {useState, useEffect} from "react";

import Header2 from "../Header-2/Header2";
import offer_delete from "../../assets/image/offer-delete.svg";
import Job_search_svg from "../../assets/image/job-search-svg.svg";
import {getUserSubmitJobDetail} from "../Utils/_data";
import moment from "moment";

import "./Jobsubmituser.css";
import {message} from "antd";
import {Link, useParams} from "react-router-dom";
const Joboffer = () => {
  const [Usernotify, setUsernotify] = useState([]);
  const [UsernotifySearch, setUsernotifySearch] = useState([]);
  const userData = JSON.parse(localStorage.getItem("User"));
  const params = useParams();
  const [search, setsearch] = useState("");

  const getuserNotification = async () => {
    const respons = await getUserSubmitJobDetail(params.seekerId);
    console.log("respons", respons);

    if (respons.data.status === 200) {
      setUsernotify(respons.data.data.findOffer);
      setUsernotifySearch(respons.data.data.findOffer);
    } else {
      console.log("respons not found", respons);
    }
  };
  const onHandalSearch = (e) => {
    setsearch(e.target.value);
  };

  const keywordFlag = () => {
    if (search !== "") {
      const searchByFilter =
        Usernotify &&
        Usernotify.filter(
          (item) =>
            item.submitUserId.fullname
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            item.submitUserId.email.toLowerCase().includes(search.toLowerCase())
        );
      if (searchByFilter && searchByFilter.length > 0) {
        setUsernotifySearch(searchByFilter);
      } else {
        setUsernotifySearch([]);
      }
      setsearch("");
    } else {
      setUsernotifySearch(Usernotify);
    }
  };

  useEffect(() => {
    getuserNotification();
  }, []);
  return (
    <>
      <Header2 />
      <div class="offer-section">
        <div class="container">
          <div class="back-link">
            <Link to="/jobpostlist">{`<`} back</Link>
          </div>
          <div class="offer-content-section">
            <h2 class="heading">User Submit Job List</h2>
            <div class="offer-content-inner">
              <div class="row">
                <div class="offer-search">
                  <input
                    type="text"
                    class="search-input"
                    placeholder="Search by Name or User email,"
                    onChange={onHandalSearch}
                    value={search}
                  />
                  <span
                    type="submit"
                    class="searchjobsubmit"
                    onClick={keywordFlag}
                  >
                    <img src={Job_search_svg} />
                  </span>
                </div>
              </div>
              {UsernotifySearch &&
                UsernotifySearch.map((item) => (
                  <div class="offer-row">
                    <div class="offer-description">
                      <div class="left-part">
                        <div class="name">{item.text}</div>
                        <div class="company-name">
                          {item.submitUserId.fullname}
                        </div>
                        <div class="location">{item.submitUserId.email}</div>
                      </div>
                      <div class="right-part">
                        <div class="view-button">
                          <Link
                            to={`/jobseekerprofile/${item.submitUserId._id}`}
                          >
                            view profile
                          </Link>
                        </div>
                        <div class="view-button">
                          <a href={item.file} download>
                            Download CV
                          </a>
                        </div>
                        <div class="date">
                          {moment(item).format("MMM DD YYYY")}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Joboffer;
