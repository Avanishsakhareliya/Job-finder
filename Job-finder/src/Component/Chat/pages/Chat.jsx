import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import Header2 from '../../Header-2/Header2'
import { allUsersRoute, host, get_seekerUser } from "../utils/APIRoutes";
import { getEmployerChatData, getJobseekerChatData } from '../../Utils/_data'
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import '../Chat.css'

export default function Chat() {
  // const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const UserData = JSON.parse(localStorage.getItem("User"))
  useEffect(async () => {
    if (!localStorage.getItem("User")) {
      // navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem("User")
        )
      );
    }
    document.getElementById("google_translate_element").classList.remove("mylanguage")

  }, []);
  useEffect(() => {
    if (currentUser) {
      // console.log("c user ----------", currentUser)
      socket.current = io(host);
      socket.current.emit("add-user", UserData._id);
    }
  }, [currentUser]);

  const chatUserData = async () => {
    if (UserData.role === 'Jobseeker') {
      // if (currentUser.isAvatarImageSet) {
      // const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
      const check = await getJobseekerChatData(UserData._id)
      if (check.jobinfo.status === 200) {
        setContacts(check.jobinfo.data.data);
      }
      // console.log("check ------------>>",check)
      // console.log("ans ------------>>",ans)

      // } else {
      // navigate("/setAvatar");
      // }
    } else {
      const ans = await getEmployerChatData(UserData._id);
      if (ans.jobinfo.status === 200) {
        setContacts(ans.jobinfo.data.data);
      }
    }
  }
  useEffect(() => {
    chatUserData()
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
    <Header2/>
      <div className="main-chat">
      <div class="chat-settings">
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
        </div>
      </div>
    </>
  );
}

