import React, { useEffect, useState } from 'react'
import Header2 from '../Header-2/Header2'
import './Accountsetting.css'
import Account_field_icon1 from '../../assets/image/account-icon1.svg'
import Account_field_icon2 from '../../assets/image/account-icon2.svg'
import Account_field_icon3 from '../../assets/image/account-icon3.svg'
import Account_field_icon4 from '../../assets/image/account-icon4.svg'
import Account_field_icon5 from '../../assets/image/account-icon5.svg'
import Account_field_icon6 from '../../assets/image/account-icon6.svg'
import { Link,useHistory } from 'react-router-dom'
import { message, Modal, Button } from 'antd'
import {deleteAccount,setEmployerAccount} from '../Utils/_data'
import axios from 'axios'


const Accountsetting=()=>{
  const userData=JSON.parse(localStorage.getItem('User'))

    const [account,setAccount]=useState({fullname:'',password:'',email:'',mobileNumber:''})
    const [Employeraccount,setEmployeraccount]=useState({fullname:'',password:'',email:''})

    const [type,setType]=useState('password')
    const [create,setCreate]=useState(false)
const history =useHistory()
    const showHide=(e)=>{
        //e.preventDefault();
        //e.stopPropagation();
        setType(type === 'password' ? 'text' : 'password')  
      }

      const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (e) => {
    if(e.target.checked){
    setIsModalVisible(true);
    setCreate(true)
    }
  };


  const handleCancel = () => {
    setIsModalVisible(false);
    setCreate(false)

  };
  const onHandaleEmployerChange=(e)=>{
    setEmployeraccount({...Employeraccount,[e.target.name]:e.target.value})
}
const [ErrorCheck, setErrorCheck] = useState({
    e1: "",
    e2: "",
    e3: "",
    check: false
})

      const [Error, setError] = useState({
        e1: "",
        e2: "",
        e3: "",
        check: false
    })
    function validation() {
        account.fullname === "" ? setError((prev) => ({ ...prev, e1: "enter fullname", check: true })) : setError((prev) => ({ ...prev, e1: "", check: false }))
        account.email === "" ? setError((prev) => ({ ...prev, e2: "enter email", check: true })) : setError((prev) => ({ ...prev, e2: "", check: false }))
        account.mobileNumber === "" ? setError((prev) => ({ ...prev, e3: "enter phoneNUmber", check: true })) : setError((prev) => ({ ...prev, e3: "", check: false }))
    }

    const onHandaleDelete=async(e)=>{
        if(e.target.checked){
            const result=await deleteAccount(userData._id,{deletAccount:true})
            if(result.jobinfo.status===200){
                alert('are you sure delete Account')
                localStorage.setItem('Token','');
                localStorage.setItem('User',{});
                message.success('successfully delete account')
                history.push('/')
            }
        }
    }
    function validationEmployer() {
        Employeraccount.fullname === "" ? setErrorCheck((prev) => ({ ...prev, e1: "enter fullname", check: true })) : setErrorCheck((prev) => ({ ...prev, e1: "", check: false }))
        Employeraccount.email === "" ? setErrorCheck((prev) => ({ ...prev, e2: "enter email", check: true })) : setErrorCheck((prev) => ({ ...prev, e2: "", check: false }))
        Employeraccount.password === "" ? setErrorCheck((prev) => ({ ...prev, e3: "enter password", check: true })) : setErrorCheck((prev) => ({ ...prev, e3: "", check: false }))
    }

    const onSetEmployerAccount=async()=>{
        validationEmployer()
        if (Error.check === false) {
        const result=await setEmployerAccount(Employeraccount)
        console.log('result',result)
        if(result.data.status===200){
            message.success('successfull Employer create account')
            setEmployeraccount({fullname:'',password:'',email:''})
            setIsModalVisible(false);
            setCreate(false)
        }else{
            message.success('fail Employer account')
        }
    }
    }
    async function UpdateData() {
        validation()
        if (Error.check === false) {
            if(account.password===''){
                const data={
                    fullname:account.fullname,email:account.email,mobileNumber:account.mobileNumber
                }
            const result = await axios.post(`https://api-job-finder.herokuapp.com/api/accountuser/${userData._id}`, data)
            console.log(result);
            if (result.status === 200) {
                message.success("update User Account Successfully")
            }else{
                message.error("update User Account somthing wrrong")

            }
        }
        else{
            const result = await axios.post(`https://api-job-finder.herokuapp.com/api/accountuser/${userData._id}`, account)
            console.log(result);
            if (result.status === 200) {
                message.success("update User Account Successfully")
            }else{
                message.error("update User Account somthing wrrong")
            }
        }
        }
        
    }

      

      const onHandaleChange=(e)=>{
          setAccount({...account,[e.target.name]:e.target.value})
      }
      
      const setAccountSetting=()=>{
        setAccount({
            fullname:userData.fullname,password:'',email:userData.email,mobileNumber:userData.mobileNumber
        })
      }

    //   function googleTranslateElementInit() {
    //     new google.translate.TranslateElement({pageLanguage: 'en'}, document.getElementById('google_translate_element'));
    //   }
      useEffect(()=>{
        setAccountSetting()
        document.getElementById("google_translate_element").classList.add("mylanguage");
        // googleTranslateElementInit()
      },[])
    return<>
     <Header2/>  
     <Modal title="Basic Modal" visible={isModalVisible} onOk={onSetEmployerAccount} onCancel={handleCancel}>
     <div class="name">
        Full Name
      </div>
      <div class="account-right-part">
      <input type="text" id="fullname" value={Employeraccount.fullname} name="fullname" placeholder="Full name" onChange={onHandaleEmployerChange}/>
      <span id='ee'>{ErrorCheck.e1}</span>

            </div>
            <div class="name">
        email
      </div>
      <div class="account-right-part">
      <input type="text" id="email" value={Employeraccount.email} name="email" placeholder="example@mail.com" onChange={onHandaleEmployerChange}/>
      <span id='ee'>{ErrorCheck.e2}</span>

            </div>
            <div class="name">
        password
      </div>
      <div class="account-right-part">
      <input type="password" id="password" value={Employeraccount.password} name="password" placeholder="xxxxxxxxxxxxxxxxxxxx" onChange={onHandaleEmployerChange}/>
      <span id='ee'>{ErrorCheck.e3}</span>

            </div>
      </Modal>
     <div class="account-setting">
    <div class="container">
    <div class="back-link"><Link to="/setting">{`<`} back</Link></div>
        <div class="account-setting-wrapper">
            <h2 class="heading">Account Settings</h2>
            <div class="account-setting-inner">
                <div class="account-field">
                    <div class="account-left-part">
                        <div class="icon">
                            <img src={Account_field_icon1} />
                        </div>
                        <div class="name">
                                    Full Name
                        </div>
                     </div>
                     <div class="account-right-part">
                        <input type="text" id="fullname" value={account.fullname} name="fullname" placeholder="Full name" onChange={onHandaleChange}/>
                     </div>
                     <span id='ee'>{Error.e1}</span>
                </div>
                <div class="account-field">
                    <div class="account-left-part">
                        <div class="icon">
                            <img src={Account_field_icon2} />
                        </div>
                        <div class="name">
                           Email
                        </div>
                     </div>
                     <div class="account-right-part">
                        <input type="email" id="email" value={account.email} onChange={onHandaleChange} name="email" placeholder="example@mail.com" />
                     </div>
                     <span id='ee'>{Error.e2}</span>
                </div>
                <div class="account-field">
                    <div class="account-left-part">
                        <div class="icon">
                            <img src={Account_field_icon3} />
                        </div>
                        <div class="name">
                          Password
                        </div>
                     </div>
                     <div class="account-right-part">
                        <input type={type} id="pwd" name="password" placeholder="xxxxxxxxxxxxxxxxxxxx" value={account.password} onChange={onHandaleChange}/>
                        <span toggle="password-field" class="toggle-password"  onClick={()=>showHide()}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="11" viewBox="0 0 17 11" fill="none"><path d="M8.00977 10.043C12.7441 10.043 16.0137 6.2168 16.0137 5.02148C16.0137 3.82031 12.7383 0 8.00977 0C3.33984 0 0 3.82031 0 5.02148C0 6.2168 3.33398 10.043 8.00977 10.043ZM8.00977 9.11719C4.14844 9.11719 1.02539 5.84766 1.02539 5.02148C1.02539 4.32422 4.14844 0.925781 8.00977 0.925781C11.8535 0.925781 14.9883 4.32422 14.9883 5.02148C14.9883 5.84766 11.8535 9.11719 8.00977 9.11719ZM8.00977 8.30273C9.83203 8.30273 11.2969 6.80859 11.2969 5.02148C11.2969 3.1875 9.83203 1.74023 8.00977 1.74023C6.17578 1.74023 4.70508 3.1875 4.71094 5.02148C4.72266 6.80859 6.17578 8.30273 8.00977 8.30273ZM8.00977 6.11133C7.40039 6.11133 6.9082 5.61914 6.9082 5.02148C6.9082 4.41797 7.40039 3.93164 8.00977 3.93164C8.61328 3.93164 9.10547 4.41797 9.10547 5.02148C9.10547 5.61914 8.61328 6.11133 8.00977 6.11133Z" fill="#1D4354" fill-opacity="0.6"/></svg>
                        </span>
                     </div>
                </div>
                <div class="account-field">
                    <div class="account-left-part">
                        <div class="icon">
                            <img src={Account_field_icon4} />
                        </div>
                        <div class="name">
                           Phone number
                        </div>
                     </div>
                     <div class="account-right-part">
                        <input type="number" id="phonenumber" onChange={onHandaleChange} value={account.mobileNumber} name="mobileNumber" placeholder="1235466565"/>
                     </div>
                     <span id='ee'>{Error.e3}</span>
                </div>
                <div class="account-field">
                    <div class="account-left-part">
                        <div class="icon">
                            <img src={Account_field_icon5} />
                        </div>
                        <div class="name">
                            Delete my account
                        </div>
                     </div>
                     <div class="account-right-part">
                        <input type="checkbox" id="deleteaccount" name="deleteaccount" value="deleteaccount" onChange={onHandaleDelete} />
                        <label for="deleteaccount">I am sure that I want to delete my account</label>
                     </div>
                </div>
                <div class="account-field">
                    <div class="account-left-part">
                        <div class="icon">
                            <img src={Account_field_icon6} />
                        </div>
                        <div class="name">
                            Create Employer Account
                        </div>
                     </div>
                     <div class="account-right-part">
                        <input type="checkbox" id="createaccount" onChange={showModal} name="createaccount" value="createaccount" checked={create?true:false} />
                        <label for="createaccount">Create</label>
                     </div>
                </div>
                <div style={{ textAlign: "center" }}>
                            <button className='btnsave' style={{
                                backgroundColor: "#1D4354", width: "40%", color: "#fff", padding: "9px 10px"
                                , borderRadius: "50px", cursor: "pointer", border: "1px solid #1D4354", fontWeight: "700",
                                fontSize: "17px", marginBottom: "25px"
                            }} type="submit" name="submit-search" class="serach-button" onClick={UpdateData}>update</button>
                        </div>
            </div>
        </div>
    </div>
</div>


</>
}

export default Accountsetting