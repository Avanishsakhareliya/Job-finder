import React from 'react'
import Login_img from '../../assets/image/logo.png'


const Signup2=()=>{
return<>
    <div class="contact-form signup-2">
        <div class="logo">
            <a href="#">
                <img src={Login_img} alt="logo"/>
            </a>
        </div>
        <div class="contact-form-warrper">
          <h2 class="contact-heading">A verification code was sent to
            your mobile number</h2>
            <form id="sign-up-form" class="sign-up-form">
                <div class="phone-number form-field">
                    <input type="tel" id="phone" placeholder="Enter Varification Code" name="phonenumber" required/>
                </div>
                <button class="contact-button" type="submit">Continue to Signup</button>
            </form>
            <div class="login-in-link">
                Existing Member? <a href="#">Sign In</a> 
            </div>
        </div>
    </div>
</>
}

export default Signup2