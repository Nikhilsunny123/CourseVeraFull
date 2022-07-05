import React, { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import CourseDetails from "./pages/CourseDetails";
import LoginButton from "./components/LoginButton";
import Create from "./pages/Create";
import EditCourse from "./pages/EditCourse";
import Register from "./components/Register"
import AccountDetails from "./pages/AccountDetails";

import axios from 'axios';
import {AuthContext} from './helpers/AuthContext'
import {useState,useEffect} from 'react'


const Routes = () => {

  const [authState,setAuthState]=useState({
    username:"",
    id:0,
    status:false,
  }
  );

  return (
    <AuthContext.Provider value={{authState,setAuthState}}>

    <Fragment>
      <BrowserRouter>
        <Route exact path="/" render={() => <Dashboard/> } />
        <Route path="/coursedetails" component={CourseDetails} />
      
        <Route path="/accountdetails" component={AccountDetails} />
        
        <Route path="/create" component={Create} />
        <Route path="/edit/:id" component={EditCourse} />

        <Route path="/register" component={Register} />
        <Route path="/login" component={LoginButton} />
      </BrowserRouter>
    </Fragment>
    </AuthContext.Provider>
  );
};

export default Routes;
