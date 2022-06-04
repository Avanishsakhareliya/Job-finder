import React from 'react'
import Header2 from '../Header-2/Header2'
import Sucess_image from '../../assets/image/Sucess-image.png'
import { Link,useParams,useHistory } from 'react-router-dom'

import './Congratulations.css'


const Congratulations=()=>{
    return<>
     <Header2/>  

     <div class="sucessfully">
            <div class="container">
               <div class="back-link"><Link to="/joboffer">{`<`} back</Link></div>
                <div class="sucessfully-wrapper">
                    <div class="content">
                       <p>Congratulations on the offer</p>
                      <p>Goodluck in your new role!!</p>
                    </div>
                    <img src={Sucess_image} alt="Sucess-image"/>   
                </div>
            </div>
        </div>  
        <div class="border-bottom"></div>
        
     </>
}

export default Congratulations