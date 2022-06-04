import React,{useEffect} from "react";
import {Switch,Route,Redirect,withRouter} from "react-router-dom"

const PrivetRout = ({path,Component,history}) =>{
  // console.log(token);
  let token =localStorage.getItem("Token");
    useEffect(()=>{ },[token])
  
    return(
      <>
      
      <Switch>
    {token&&token!=="" ? <Route  
        path={path}
        component={Component}
        exact
        />
        :
        <Redirect push to="/" />
        }
      </Switch>
    
      </>
    )
  }
  
  export default withRouter(PrivetRout)