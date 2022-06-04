import React from 'react'
import Header2 from '../Header-2/Header2'
import Message_icon from '../../assets/image/message-icon.png'
import Phone_call from '../../assets/image/phone-call.svg'
import chat_icon from '../../assets/image/chat-icon.svg'
import chat_icon2 from '../../assets/image/chat-icon2.svg'

import './messages.css'


const Messages=()=>{
    return<>
     <Header2/>  

         <div class="message-section">
           <div class="container">
              <div class="back-link"><a href="#">{`<`} back</a></div>
              <div class="messages-inner">
                  <div class="row">
                      <div class="message-left-part">
                      <div class="message-left-part-inner">
                        <div class="message-field">
                          <div class="message-icon">
                              <img src={Message_icon} />
                          </div>
                          <div class="message-content">
                            <h3>Job Title</h3>
                            <div class="sub-title">Vacancy name goes here</div>
                            <p class="desc">You: thank you for contracting me</p>
                          </div>
                          <div class="time">07:34 pm</div>
                        </div>
                        <div class="message-field">
                          <div class="message-icon">
                              <img src={Message_icon} />
                          </div>
                          <div class="message-content">
                            <h3>Job Title</h3>
                            <div class="sub-title">Vacancy name goes here</div>
                            <p class="desc">You: thank you for contracting me</p>
                          </div>
                          <div class="time">07:34 pm</div>
                        </div>
                        <div class="message-field">
                          <div class="message-icon">
                              <img src={Message_icon} />
                          </div>
                          <div class="message-content">
                            <h3>Job Title</h3>
                            <div class="sub-title">Vacancy name goes here</div>
                            <p class="desc">You: thank you for contracting me</p>
                          </div>
                          <div class="time">07:34 pm</div>
                        </div>
                        <div class="message-field">
                          <div class="message-icon">
                              <img src={Message_icon} />
                          </div>
                          <div class="message-content">
                            <h3>Job Title</h3>
                            <div class="sub-title">Vacancy name goes here</div>
                            <p class="desc">You: thank you for contracting me</p>
                          </div>
                          <div class="time">07:34 pm</div>
                        </div>
                        <div class="message-field">
                          <div class="message-icon">
                              <img src={Message_icon} />
                          </div>
                          <div class="message-content">
                            <h3>Job Title</h3>
                            <div class="sub-title">Vacancy name goes here</div>
                            <p class="desc">You: thank you for contracting me</p>
                          </div>
                          <div class="time">07:34 pm</div>
                        </div>
                        <div class="message-field">
                          <div class="message-icon">
                              <img src={Message_icon} />
                          </div>
                          <div class="message-content">
                            <h3>Job Title</h3>
                            <div class="sub-title">Vacancy name goes here</div>
                            <p class="desc">You: thank you for contracting me</p>
                          </div>
                          <div class="time">07:34 pm</div>
                        </div>
                        <div class="message-field">
                          <div class="message-icon">
                              <img src={Message_icon} />
                          </div>
                          <div class="message-content">
                            <h3>Job Title</h3>
                            <div class="sub-title">Vacancy name goes here</div>
                            <p class="desc">You: thank you for contracting me</p>
                          </div>
                          <div class="time">07:34 pm</div>
                        </div>
                        <div class="message-field">
                          <div class="message-icon">
                              <img src={Message_icon} />
                          </div>
                          <div class="message-content">
                            <h3>Job Title</h3>
                            <div class="sub-title">Vacancy name goes here</div>
                            <p class="desc">You: thank you for contracting me</p>
                          </div>
                          <div class="time">07:34 pm</div>
                        </div>
                        <div class="message-field">
                          <div class="message-icon">
                              <img src={Message_icon} />
                          </div>
                          <div class="message-content">
                            <h3>Job Title</h3>
                            <div class="sub-title">Vacancy name goes here</div>
                            <p class="desc">You: thank you for contracting me</p>
                          </div>
                          <div class="time">07:34 pm</div>
                        </div>
                        </div>
                      </div>
                      <div class="message-right-part">
                          <div class="row">
                              <div class="profile-message">
                                 <img src={Message_icon} />
                              </div>
                              <div class="message-right-content">
                                  <h2>Company name / Employer name</h2>
                                  <p>Job title goes here Job title goes here</p>
                              </div>
                              <div class="call-icon">
                                <img src={Phone_call} />
                              </div>
                          </div>
                          <div class="chat-details">
                            <div class="chat-details-inner">
                                <div class="chat-field">
                                <div class="profile-pic">
                                    <img src={chat_icon} />
                                </div>
                                <div class="chats">
                                </div>
                                </div>
                                <div class="chat-field">
                                <div class="profile-pic">
                                    <img src={chat_icon2} />
                                </div>
                                <div class="chats">
                                </div>
                                </div>
                                <div class="chat-field">
                                <div class="profile-pic">
                                    <img src={chat_icon} />
                                </div>
                                <div class="chats">
                                </div>
                                </div>
                                <div class="chat-field">
                                    <div class="profile-pic">
                                        <img src={chat_icon2} />
                                    </div>
                                    <div class="chats">
                                    </div>
                                </div>
                            </div>
                            <div class="bottom-section">
                                <input type="text" id="username" name="username" placeholder="Typing......" />
                                <div class="send-button">
                                    <a href="#">
                                      Send
                                    </a>
                                </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
           </div>
         </div>

     </>
}

export default Messages