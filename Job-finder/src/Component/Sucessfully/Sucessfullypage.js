import React from 'react'
import Header2 from '../Header-2/Header2'
import Sucess_image from '../../assets/image/Sucess-image.png'
import './Sucessfullypage.css'
import { Link } from 'react-router-dom'


const Sucessfullypage=()=>{
    return<>
     <Header2/>  

     <div class="sucessfully">
            <div class="container">
               <div class="back-link"><Link to='/mapview1'>{`<`} back</Link></div>
                <div class="sucessfully-wrapper">
                    <div class="content">
                       <p>YOU DID IT!</p>
                        <p>You have successfully applied for this job!</p>
                        <p>Goodluck</p>
                    </div>
                    <img src={Sucess_image} alt="Sucess-image"/>   
                    <div class="check-button">
                    <Link to='/mapview2'>Check more vacancies</Link>
                    </div>
                </div>
            </div>
        </div>  
        <div class="border-bottom"></div>
        
     </>
}

export default Sucessfullypage