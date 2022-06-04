import React from 'react'
import Login_img from '../../assets/image/logo.png'
import './Signup1.css'
const Signup1=()=>{
return <>

<div class="contact-form signup-1">
        <div class="logo">
            <a href="#">
                <img src={Login_img} alt="logo"/>
            </a>
        </div>
        <div class="contact-form-warrper">
          <h2 class="contact-heading">Sign up</h2>
            <div class="language">
                <span class="english">
                    English
                </span>
                <span class="arabic">
                    Arabic
                </span>
            </div>
            <form id="sign-up-form" class="sign-up-form">
                <div class="phone-number form-field">
                    <input type="tel" id="phone" placeholder="Enter Mobile Number" name="phonenumber" required/>
                </div>
                <div class="terms-conditions">
                    <input id="radio" type="radio" />
                    <label for="radio">I accept the <a href="javascript:void(0)">Terms & Conditions</a></label>
                </div>
                <button class="contact-button" type="submit">Submit</button>
            </form>
            <div class="login-in-link">
                Existing Member? <a href="#">Sign In</a> 
            </div>
        </div>
    </div>
</>
}

export default Signup1