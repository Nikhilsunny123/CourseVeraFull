import React, { Fragment } from 'react'
import { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import './Create.css';
import Navbar from "../Navbar";

function Create() {

  const [courseName,setCourseName]=useState('');
  const [courseContent,setCourseContent]=useState('');
  const [courseDuration,setCourseDuration]=useState('');

  const [coursePrice, setCoursePrice] = useState("");


  const [submitted,setSubmitted]=useState(false);
  const [error,setError]=useState(false);

  const handleCourseName = (e) => {
    setCourseName(e.target.value);
  };
  const handleCourseContent = (e) => {
    setCourseContent(e.target.value);
  };
  const handleCourseDuration = (e) => {
    setCourseDuration(e.target.value);
  };
  const handleCoursePrice = (e) => {
    setCoursePrice(e.target.value);
  };
  const handleSubmit=(event)=>
  {
    if(courseName==='' || courseContent===''|| courseDuration==='' || coursePrice==='')
        {
          setError(true);
        }
        else
        {
          Axios.post('http://localhost:3001/createcourse',
                    { coursename:courseName,
                      coursecontent:courseContent,
                      courseduration:courseDuration,
                      courseprice:coursePrice}).then(
                      (responce)=>
                      {
                        
                         
                            setSubmitted(true);
                            setError(false)
                            console.log(responce);
                        
                      })
         }             
         event.preventDefault();
  }
  const successMessage=()=>{
    return (
      <div className='success'
      style={{display:submitted ? '' : 'none', }}>
      <h4 style={{color:"green"}}>course {courseName} successfully Added</h4>
      {error}
    </div>
    );
  };
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h4 style={{color :"red"}}>Please enter all the fields</h4>
      </div>
    );
  };
  
  return (
    <div>
      <Navbar/>
      
      
        <div className="centerDiv">

        <div className='messages'>
          {errorMessage()}
          {successMessage()}
        </div>
        <form>
            <h1 style={ {position:'center' ,color :"blue"}}>Add New Course</h1>

            <label htmlFor="fname">Course Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="coursename"
              value={courseName}
              onChange={handleCourseName}
              required
             
            />
            <br />
            <label htmlFor="fname">Course content</label>
            
              <br />
            <textarea 
                className="input" rows="5" cols="50" 
                id="multiLineInput" name='coursecontent'
                value={courseContent}
              onChange={handleCourseContent}
                required></textarea>
            <br />
            <label htmlFor="duration">Course duration</label>
            <br />
            <input 
             className="input" 
              type="text"
              value={courseDuration}
              onChange={handleCourseDuration}
            
            id="duration" name="courseduration" 
            required />
            <br />

            <label htmlFor="fname">Price</label>
            <br />
            <input 
              className="input" 
              type="number" 
              required
              value={coursePrice}
              onChange={handleCoursePrice}
            
            id="fname" name="Price" />
            <br />
          
          <br />
         
            <button type="submit" onClick={handleSubmit}  className="uploadBtn">Submit</button>
            </form>
            <br/>
            <Link to="/coursedetails" style={{color:'blue'}}>CourseDetails</Link>
        </div>
     
      </div>
    
  )
}

export default Create