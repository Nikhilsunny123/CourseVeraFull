import React, { Fragment, useEffect } from 'react'
import { useState,useContext} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import './Create.css';

import {useHistory} from 'react-router-dom';
import {AuthContext} from '../helpers/AuthContext';


function Create() {

  const history=useHistory();
  const{authState}=useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [courseName,setCourseName]=useState('');
  const [courseContent,setCourseContent]=useState('');
  const [courseDuration,setCourseDuration]=useState('');
  const [LoginStatus,setLoginStatus]=useState("");

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

  useEffect(()=>{
    if(!localStorage.getItem("accessToken")){
      alert("Deleted SuccessFully")
      history.push("/login")
    }
  });
  const createCourse=()=>
  {
    if(courseName==='' || courseContent===''|| courseDuration==='' || coursePrice==='')
        {
          setError(true);
          errorMessage(true);
        }
        else
        {
          axios.post('http://localhost:3001/course',
                
                  {           
                      title:courseName,
                      content:courseContent,
                     duration:courseDuration,
                      price:coursePrice
                    },
                      {
                        headers: {
                          accessToken: localStorage.getItem("accessToken"),
                        },
                      }
                      )
                      .then(
                      (responce)=>
                      {
                        if (responce.data.error) {
                          console.log(responce.data.error)
                       
                      }
                      else
                      {
                        setSubmitted(true);
                        setError(false)
                        console.log(responce);
                        history.push("/coursedetails")
                      }
                      })
         }             
       
  }

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
      
      
      
        <div className="centerDiv">

        <div className='messages'>
        
        </div>
        {errorMessage()}
         {LoginStatus}
        <form onSubmit={handleSubmit(createCourse)}>
            <h1 style={ {position:'center' ,color :"blue"}}>Add New Course</h1>

            
            <br />
            <input
             type="text" {...register("coursename", { required: true})}
              className="input"
              placeholder='CourseName...'
             
              id="fname"
              
              value={courseName}
              onChange={handleCourseName}
              
             
            />
            <br />
            {errors.coursename && <p className='validation'>Please Enter the CourseName</p>}
            
            
              <br />
            <textarea 
             {...register("content", { required: true})}
                className="input" 
                placeholder='CourseContent...' 
                rows="5" cols="50" 
                id="multiLineInput" 
                value={courseContent}
              onChange={handleCourseContent}
             ></textarea>
            <br />
            {errors.content && <p className='validation'>Please Enter the CourseContent</p>}
            <br/>
            
            <br />
            <input 
            type="text"
             className="input" {...register("courseduration", { required: true})} 
              
              value={courseDuration}
              onChange={handleCourseDuration}
              placeholder='CourseDuration...' 
            id="duration" 
            />
            <br />
            {errors.courseduration && <p className='validation'>Please Enter the CourseDuration</p>}
            <br/>
            
            <br />
      
            <input 
            type="number" {...register("price", { required: true})}
              className="input" 
              
              
              value={coursePrice}
              onChange={handleCoursePrice}
              placeholder='CoursePrice...' 
            id="fname"  />
            <br />
            {errors.price && <p className='validation'>Please Enter the Price</p>}
          
          <br />
         
            <button type="submit"  className="uploadBtn">Submit</button>
            <br/>
            <br/>
            <h4><Link to="/coursedetails" style={{color:'dark blue' ,position:'center'}}> View All Courses</Link></h4>
            </form>
            <br/>
           
        </div>
     
      </div>
    
  )
}

export default Create