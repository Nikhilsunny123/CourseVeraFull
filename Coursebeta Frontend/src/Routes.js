import React, { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import CourseDetails from "./pages/CourseDetails";
import LoginButton from "./components/LoginButton";
import Create from "./pages/Create";
import EditCourse from "./pages/EditCourse";
import Register from "./components/Register"


const Routes = () => {

  return (
    <Fragment>
      <BrowserRouter>
        <Route exact path="/" render={() => <Dashboard/> } />
        <Route path="/coursedetails" component={CourseDetails} />
        <Route path="/register" component={Register} />
        
        
 
        <Route path="/create" component={Create} />
        <Route path="/edit" component={EditCourse} />
        <Route path="/login" component={LoginButton} />
      </BrowserRouter>
    </Fragment>
  );
};

export default Routes;
