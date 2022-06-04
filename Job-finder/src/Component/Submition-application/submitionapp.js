import React, { useState } from 'react'
import Header2 from '../Header-2/Header2'
import file_left from '../../assets/image/file-left.svg'
import file_delete from '../../assets/image/file-delete.svg'
import './submitionapp.css'
import {Convert} from 'mongo-image-converter';
import { Link,useParams,useHistory } from 'react-router-dom'
import {submitUserData} from '../Utils/_data'

const Submitionapp=()=>{

    const [filename,setFileName]=useState('')
    const [file,setFile]=useState({cvfile:''})
    const [bainary,setBainary]=useState('')
    const [submittext,setSubmittext]=useState('')
    const params=useParams();
    const history=useHistory()

    const onClickFiles=(e)=>{
        setFileName(e.target.files[0].name)
        setFile({cvfile:e.target.files[0]})
    }

    const onHandalText=(e)=>{
        setSubmittext(e.target.value)
    }

    const onSubmit=async(e)=>{
        var storeFiles=""
        const reader = new FileReader();
        reader.readAsDataURL(file.cvfile)
         reader.onloadend =async () => {
            const base64String = reader.result
            const obj={
                jobId:params.jobId,
                 text:submittext,
                file:base64String
            }
    const respons =await submitUserData(obj)
    if(respons.data.status==200){
        console.log('successfull add submitUserData')
        history.push('/sucessfullypage')
    }else{
        console.log('somthing wait wrong')
    }
     }     
    }

    const onDeletName=()=>{
        setFileName('')
    }
    return<>
     <Header2/>  

        <div class="submition-application">
            <div class="container">
                <div class="back-link"><Link to={`/jobdetails/${params.jobId}`}>{`<`} back</Link></div>
                    <div class="apply-form">
                    <h2 class="heading">Apply for the job</h2>
                        <div id="apply-job-form" class="apply-job-form">
                            <textarea id="textarea" name="textarea" rows="11" onChange={onHandalText} value={submittext} placeholder="(Optional) Write your cover letter. Do not Exceed 300 word">
                            </textarea>
                            <p>You may attach up to 10 files under the size of 25MB each. Include work samples or other documents to support your application.</p>
                            {filename?<div class="file-name">
                              <img src={file_left} alt="social-icon-3"/> 
                                <span>{filename}<p>is attached</p></span>
                             <img src={file_delete} alt="social-icon-3" onClick={onDeletName}/> 
                            </div>:null}
                            
                            <div class="upload">
                                <label for="files" class="btn" >Attach File / CV </label>
                                <input id="files" type="file" onChange={(e)=>onClickFiles(e)}/>
                            </div>
                            <div class="submit">
                                <input class="submit-btn" type="submit" onClick={onSubmit}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <div class="border-bottom"></div>
     </>
}

export default Submitionapp