import React from "react";
import {
    Route,
    Redirect,
} from "react-router-dom";


const PrivateRoute = ({component:Component,loginStatus,token,...rest}) => (
    <Route {...rest} render = {(props)=>(
        loginStatus === true
            ? <Component loginStatus={loginStatus} token={token}/>
            : <Redirect to="/login"/>
    )}
    />
);

export default PrivateRoute;