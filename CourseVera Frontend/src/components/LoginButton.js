import React,{useEffect, useState} from 'react';
import Axios from 'axios';
import './Login.css';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton';
<<<<<<< HEAD
import { useForm } from "react-hook-form";
=======
import axios from 'axios';
>>>>>>> 405207d2a1fc40652553b35ab34f5f792789bfb1

function LoginButton() {

  const history=useHistory();

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [username,setName]=useState('');
  const [password,setPassword]=useState('');

<<<<<<< HEAD
  const [LoginStatus,setLoginStatus]=useState("");
=======
  const [LoginStatus,setLoginStatus]=useState(false);

 
>>>>>>> 405207d2a1fc40652553b35ab34f5f792789bfb1

  Axios.defaults.withCredentials=true; //for session

  useEffect(()=>{
    Axios.get("http://localhost:3001/login").then((responce)=>{
      if(responce.data.loggedIn===true){
        setLoginStatus(responce.data.username[0].username)
      }
      
    });
  },[]);
  
<<<<<<< HEAD
  const login = () => {
=======
  const login = (event) => {
>>>>>>> 405207d2a1fc40652553b35ab34f5f792789bfb1
    Axios.post("http://localhost:3001/login", {
      username:username,
      password:password,
    }).then((response) => {
      if (!response.data.auth) {
<<<<<<< HEAD
        
        setLoginStatus(<p style={{color:"red"}}>{response.data.message}</p>);
        
      } else {
        
        localStorage.setItem("token",response.data.token)
        setLoginStatus('welcome');
=======
        setLoginStatus(false);
      } else {
        
        localStorage.setItem("token",response.data.token)
       setLoginStatus(true);
>>>>>>> 405207d2a1fc40652553b35ab34f5f792789bfb1
        // setTimeout(()=>{
        //   history.push('/');
        // },4000)
      }
    });
<<<<<<< HEAD
  
=======
    event.preventDefault();
>>>>>>> 405207d2a1fc40652553b35ab34f5f792789bfb1
  };

  const userAuthenticated=()=>{
    Axios.get("http://localhost:3001/isUserAuth",{
      headers:{"x-access-token":localStorage.getItem("token"),},
        }).then((responce)=>{
      console.log(responce);
    })
  }
<<<<<<< HEAD

=======
  

  
>>>>>>> 405207d2a1fc40652553b35ab34f5f792789bfb1
  return (
    <div>
      
      <div>
      <div className="loginParentDiv">
      <h2>Login</h2> <CloseButton style={{width:"30px" ,height:"30px" , position: "absolute",top: "8px",right: "16px"}} />
    
<<<<<<< HEAD
        <form onSubmit={handleSubmit(login)}>
        
          <br />
          <input type="text" {...register("name", { required: true})} placeholder='UserName...' onChange={(e)=>{
          setName(e.target.value);
          
=======
        <form>
        
          <br />
          <input type="text" required placeholder='UserName...' onChange={(e)=>{
          setName(e.target.value);
          
        }}/><br/>
          
          <br />
          <input type="password" required placeholder='Password...' onChange={(e)=>{
          setPassword(e.target.value);
          
>>>>>>> 405207d2a1fc40652553b35ab34f5f792789bfb1
        }}/><br/>
          {errors.name && <p className='validation'>Please Enter the userame</p>}
          <br />
          <input type="password" {...register("password", { required: true})} placeholder='Password...' onChange={(e)=>{
          setPassword(e.target.value);
          
        }}/><br/>
         {errors.password && <p className='validation'>Please enter password</p>}
          <br />
          <button type="submit" >Login</button>
          <br>
          </br>
          
        </form>
        
        <Link to="/register" style={{color:'blue'}}>Signup</Link>
        
<<<<<<< HEAD
        <h1 > {LoginStatus}
=======
        <h1 > {LoginStatus && (
          <button onClick={userAuthenticated}>check if authenticated </button> 
          )}
>>>>>>> 405207d2a1fc40652553b35ab34f5f792789bfb1
              </h1>
      </div>
    </div>
    </div>
  )
}

export default LoginButton;

   