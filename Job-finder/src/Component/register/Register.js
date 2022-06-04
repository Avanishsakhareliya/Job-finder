import React, { useState, useEffect } from 'react'
import logo from '../../assets/image/logo.png'
import axios from 'axios'
import { message } from 'antd';

import { Link, useHistory } from 'react-router-dom'
import './Register.css'

const Register = () => {
    const [register, setRegister] = useState({ fullname: "", email: '', password: '' })
    const [type, setType] = useState('password')

    const history = useHistory()

    const onHandalChange = (e) => {
        setRegister({ ...register, [e.target.name]: e.target.value })
    }
    const showHide = (e) => {
        //e.preventDefault();
        //e.stopPropagation();
        setType(type === 'password' ? 'text' : 'password')
    }

    const onRegister = async (e) => {
        if (register.fullname === '') {
            return message.warning('fullname is eamty')
        } else if (register.email === '') {
            return message.warning('email is eamty')
        } else if (register.password === '') {
            return message.warning('password is eamty')
        }
        // e.preventdefault()
        const data = await axios.post('https://api-job-finder.herokuapp.com/api/signup', register).catch((err) => {
            if (err.response.status === 403) { message.error('enter valid email') } else if (err.response.status === 405) {
                message.error('User alrady exist')
            }
        });
        if (data.status === 200) {
            message.success('password is eamty')
            console.log('successfull Register now')
            localStorage.setItem('Token', data.data.userdata.token)
            localStorage.setItem('User', JSON.stringify(data.data.userdata))
            setRegister({ fullname: "", email: '', password: '' })
            history.push('/mapview2')
        } else {
            console.log('something wait wrong')
            return message.error('something wait wrong')
        }
    }

    useEffect(() => {
        const Token = localStorage.getItem('Token')
        if (Token && Token !== '') {
            history.push('/mapview2')
        }
    document.getElementById("google_translate_element").classList.remove("mylanguage")

    })
    
    return <>

        <div class="contact-form register">
            <div class="logo">
                <a href="#">
                    <img src={logo} alt="logo" />
                </a>
            </div>
            <div class="contact-form-warrper">
                <h2 class="contact-heading">Sign up</h2>
                <div id="sign-up-form" class="sign-up-form">
                    <div class="full-name form-field">
                        <input type="text" id="fullname" placeholder="Full Name" onChange={onHandalChange} value={register.fullname} name="fullname" required />
                    </div>
                    <div class="email form-field">
                        <input type="email" id="email" onChange={onHandalChange} value={register.email} placeholder="example@mail.com" name="email" required />
                    </div>
                    <div class="password form-field">
                        <input type={type} id="password" onChange={onHandalChange} value={register.password} placeholder="xxxxxxxxxxxxxxxxxx" name="password" required />
                        <span toggle="password-field" class="toggle-password" onClick={() => showHide()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="11" viewBox="0 0 17 11" fill="none"><path d="M8.00977 10.043C12.7441 10.043 16.0137 6.2168 16.0137 5.02148C16.0137 3.82031 12.7383 0 8.00977 0C3.33984 0 0 3.82031 0 5.02148C0 6.2168 3.33398 10.043 8.00977 10.043ZM8.00977 9.11719C4.14844 9.11719 1.02539 5.84766 1.02539 5.02148C1.02539 4.32422 4.14844 0.925781 8.00977 0.925781C11.8535 0.925781 14.9883 4.32422 14.9883 5.02148C14.9883 5.84766 11.8535 9.11719 8.00977 9.11719ZM8.00977 8.30273C9.83203 8.30273 11.2969 6.80859 11.2969 5.02148C11.2969 3.1875 9.83203 1.74023 8.00977 1.74023C6.17578 1.74023 4.70508 3.1875 4.71094 5.02148C4.72266 6.80859 6.17578 8.30273 8.00977 8.30273ZM8.00977 6.11133C7.40039 6.11133 6.9082 5.61914 6.9082 5.02148C6.9082 4.41797 7.40039 3.93164 8.00977 3.93164C8.61328 3.93164 9.10547 4.41797 9.10547 5.02148C9.10547 5.61914 8.61328 6.11133 8.00977 6.11133Z" fill="#1D4354" fill-opacity="0.6" /></svg>
                        </span>
                    </div>
                    <button class="contact-button" type="submit" onClick={(e) => onRegister(e)}>Create an Account</button>
                </div>
                <div class="login-in-link">
                    Existing Member? <Link to='/login'>Sign In</Link>
                </div>
            </div>
        </div>
    </>
}

export default Register