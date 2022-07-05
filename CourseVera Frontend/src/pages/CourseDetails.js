import React from "react";
import Axios from 'axios';
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Button from 'react-bootstrap/Button'
import { Link,useParams } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import './CourseDetails.css';
import Card from 'react-bootstrap/Card';
import { useState,useEffect,useContext} from 'react';

import {AuthContext} from '../helpers/AuthContext';

function CourseDetails() {
  
  const history=useHistory();
  const{authState}=useContext(AuthContext);
  
  const [coursedetails, setCourseDetails] = useState([]);

  const deleteCourse =(course)=>{
    Axios.delete(`http://localhost:3001/deletecourse/${course}`)
  }

  useEffect(() => {
    if(!authState.status)
    {
      history.push("/login")
    } 
    else
    {
    Axios.get('http://localhost:3001/course',)
    .then((responce) => {
      console.log(responce)
      setCourseDetails(responce.data)
    });
  }
}, []);
  return (
    
    <div className="d-flex">
      <div>
        <Sidebar/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
        <Navbar/>
        <div style={{height:"100%"}}>
          <div style={{padding:"20px 5%",height:"calc(100% - 64px)",overflowY:"scroll"}}>
            <div style={{display:"grid", gridTemplateColumns:"repeat(1, minmax(200px, 700px))"}}>
              <div className="mt-5 w-100">
                <div className="create">
                  <div className="mb-2">
                   <Button variant="info glyphicon glyphicon-plus-sign"  >
                     <Link to="/create" style={{color:'white'}}> Add New Course</Link> 
                   </Button>
                  </div>
                </div>
              </div>
            </div>
          <div>
          <h2 className="text-center font-weight-bold">All Courses</h2>
          <br/>
        </div>
        <div className="row">
        {coursedetails.map((val,key)=> {
          return (
           
            <div className=" mb-4 col-md-4">
              <Card onClick={()=>{history.push(`/edit/${val.id}`)}} >
               
              <Card.Img variant="top" src="" />
                <Card.Body>
                  <Card.Title className="cardtitle"><label className="text">Name : </label>{val.title}</Card.Title>
                    <Card.Text>
                    <label className="text">Description : </label> {val.content}
                  </Card.Text>
                  <Card.Text>
                  <label className="text">Price : </label> {val.price}
                  </Card.Text>
                  <Card.Text>
                    <label className="text">Duration : </label>
                  {val.duration}
                  </Card.Text>
                  <Button  className="btn btn-outline-dark">View </Button>
                
                </Card.Body>
                
            </Card>
            </div>

          );
        })}
      </div>
      </div>
    </div>
  </div>
  </div>

  )
}

export default CourseDetails