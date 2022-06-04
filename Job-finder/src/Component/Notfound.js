import React from "react";
import notfound from "../assets/image/Notfound.jpeg"
import Header from "./Header-2/Header2";

const Notfound=()=>{
    const style={
     display: 'flex',
     justifyContent: 'center'
    }
    return(
        <>
        <Header/>
<div style={style}>
    <img src={notfound} alt="" />
</div>
        </>
    )
}

export default Notfound