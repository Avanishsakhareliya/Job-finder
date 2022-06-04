import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import Phone_call from '../../../assets/image/phone-call.svg'

// import imgAvtar from "C:/nodejs/finder/job-finder/src/assets/image/phone-call.svg"
import imgAvtar from "../../../assets/image/beard.jpg"
// import '../Chat.css'
export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

// console.log("currentChat----",currentChat)
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem("User")
    );
    // console.log("data------",data)
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });
    // console.log("Response-------",response);
    setMessages(response.data);
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem("User")
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem("User")
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              // src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              src={imgAvtar}
              alt=""
            />
          </div>
          <div className="fullname">
           { <h3>{currentChat.fullname}</h3>}
          </div>
        </div>
       
           <img src={Phone_call} className='phone-icon'/>
                           
      </div>
      <div className="chat-messages">
        {messages&&messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 12% 77% 10%;
  gap: 0.1rem;
  overflow: hidden;
  background: #ffffff;
 border-radius: 20px;
 padding-top: 5px;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  @media only screen and (min-width: 767px) { 
    grid-template-rows: 5% 79% 16%;
  }
 
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 34px 1.2rem;
    box-shadow: 0 8px 6px -6px #e7e7e7;
    background: #fff;
    z-index: 111;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 4rem;
    border-radius: 100%;
        }
      }
      .fullname {
        h3 {
          color: #1D4354;
    margin: 0px;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        p { 
 margin: 0px;
 font-size: 14px;
 color: #1D4354;
}
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
          
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #f5f5f5;
        padding: 10px 12px;
      }
    }
  }
`;
