import React, { useState,useEffect } from 'react'
import Login_img from '../../assets/image/logo.png'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd';

import './Login.css'

const Login=()=>{

    const [login,setLogin]=useState({email:'',password:''})

    const onHandalChange=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value})
    }
    const history =useHistory()
    const onRegister=async(e)=>{

        if(login.email===''){
         return   message.warning('email is eamty')
        }else if(login.password===''){
          return  message.warning('password is eamty')
        }
        // e.preventdefault()
        const data=await axios.post('https://api-job-finder.herokuapp.com/api/login',login).catch((err)=>{
            if(err.response.status===400)
            {message.error('enter valid data')}else if(err.response.status===401){
                message.error('INvalid User')
            }
        
        });
        if(data.status===200){
            message.success('successfull login now');
            console.log('successfull login now')
            setLogin({email:'',password:''})
        console.log('successfull Register now',data)
        localStorage.setItem('Token',data.data.token)
        localStorage.setItem('User',JSON.stringify(data.data.finduser))
        history.push('/mapview2')
        }else{
            console.log('something wait wrong')
          return  message.error('something wait wrong')
        }
      }

      useEffect(()=>{
         const Token= localStorage.getItem('Token')
         if(Token&&Token!==''&&Token!==null){
            history.push('/mapview2')
         }
      })
return<>
<div class="contact-form login">
        <div class="logo">
            <a href="#">
                <img src={Login_img} alt="logo"/>
            </a>
        </div>
        <div class="contact-form-warrper">
          <h2 class="contact-heading">Sign In</h2>
            <div id="sign-up-form" class="sign-up-form">
                <div class="email form-field">
                    <input type="email" id="email" placeholder="Email" name="email" onChange={(e)=>onHandalChange(e)} value={login.email} required/>
                </div>
                <div class="password form-field">
                    <input type="password" id="password" placeholder="Password" name="password" onChange={(e)=>onHandalChange(e)} value={login.password} required/>
                </div>
                <button class="contact-button" type="submit" onClick={onRegister}>Sign in</button>
            </div>
            <div class="login-in-link">
                New to Job Finder? <Link to='/'>Sign Up</Link> 
            </div>
        </div>
    </div>
</>
}

export default Login