import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import {isAuthenticated} from './index';

const PrivateRoute = ({component:Component, ...rest})=>{

    return (
        
        // Show the component only when the user is logged in 
        // otherwise, redirect the user to /signin page

        <Route {...rest} render= {props =>(
            isAuthenticated() ? <Component {...props} />
            :<Redirect to ="/signin" />
        )} 
        />
    );
}

export default PrivateRoute;