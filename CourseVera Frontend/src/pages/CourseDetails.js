import React from "react";
import Axios from 'axios';
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import './CourseDetails.css';
import Card from 'react-bootstrap/Card'
import { useState,useEffect } from 'react';

function CourseDetails() {

  const history = useHistory();
  
 /* const editCourse = () =>{ 
    let path = `/edit`; 
    history.push(path);
  } */
  const [coursedetails, setCourseDetails] = useState([]);


  const deleteCourse =(course)=>{
    Axios.delete(`http://localhost:3001/deletecourse/${course}`)
  }

  useEffect(() => {
    Axios.get('http://localhost:3001/coursedetails')

    .then((responce) => {
      console.log(responce)
      setCourseDetails(responce.data)
    });
   
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
          <h3>All Courses</h3>
        </div>
        {coursedetails.map((val)=> {
          return (
              <Card style={{ width: '18rem'}}>
              <Card.Img variant="top" src="" />
                <Card.Body>
                  <Card.Title className="cardtitle"><label>Name :</label>{val.coursename}</Card.Title>
                    <Card.Text>
                    <label>Description :</label> {val.coursecontent}
                  </Card.Text>
                  <Card.Text>
                  <label>Price :</label> {val.courseprice}
                  </Card.Text>
                  <Card.Text>
                    <label>Duration :</label>
                  {val.courseduration}
                  </Card.Text>
                  <Button onClick={()=>deleteCourse(val.coursename)} className="btn btn-outline-dark">Edit </Button>
                  <Button  className="btn btn-outline-dark">Delete</Button>
                  
                </Card.Body>
            </Card>

          );
        })}

       



       
          
         

        
        
      </div>
    </div>
  </div>
  </div>
     

    
  )
}

export default CourseDetails