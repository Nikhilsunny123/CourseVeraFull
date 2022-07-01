import React,{useEffect, useState} from 'react';
import Axios from 'axios';
import './Login.css';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton';
import { useForm } from "react-hook-form";

function LoginButton() {

  const history=useHistory();

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [username,setName]=useState('');
  const [password,setPassword]=useState('');

  const [LoginStatus,setLoginStatus]=useState("");

  Axios.defaults.withCredentials=true; //for session

  useEffect(()=>{
    Axios.get("http://localhost:3001/login").then((responce)=>{
      if(responce.data.loggedIn===true){
        setLoginStatus(responce.data.username[0].username)
      }
      
    });
  },[]);
  
  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username:username,
      password:password,
    }).then((response) => {
      if (!response.data.auth) {
        
        setLoginStatus(<p style={{color:"red"}}>{response.data.message}</p>);
        
      } else {
        
        localStorage.setItem("token",response.data.token)
        setLoginStatus('welcome');
        // setTimeout(()=>{
        //   history.push('/');
        // },4000)
      }
    });
  
  };

  const userAuthenticated=()=>{
    Axios.get("http://localhost:3001/isUserAuth",{
      headers:{"x-access-token":localStorage.getItem("token"),},
        }).then((responce)=>{
      console.log(responce);
    })
  }

  return (
    <div>
      
      <div>
      <div className="loginParentDiv">
      <h2>Login</h2> <CloseButton style={{width:"30px" ,height:"30px" , position: "absolute",top: "8px",right: "16px"}} />
    
        <form onSubmit={handleSubmit(login)}>
        
          <br />
          <input type="text" {...register("name", { required: true})} placeholder='UserName...' onChange={(e)=>{
          setName(e.target.value);
          
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
        
        <h1 > {LoginStatus}
              </h1>
      </div>
    </div>
    </div>
  )
}

export default LoginButton;

   