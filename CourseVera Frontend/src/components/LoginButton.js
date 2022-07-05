import React,{useEffect, useState,useContext} from 'react';
import axios from 'axios';
import './Login.css';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

import { useForm } from "react-hook-form";

function LoginButton() {

  const history=useHistory();
  const{setAuthState}=useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [username,setName]=useState('');
  const [password,setPassword]=useState('');

  const [LoginStatus,setLoginStatus]=useState("");

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login",data).then((response) => {
      if (response.data.error) {
        setLoginStatus(<p style={{color:"red"}}>{response.data.error}</p>);
     
      } else {
        localStorage.setItem("accessToken",response.data)
        setAuthState({username:response.data.username,
        id:data.id,
        status:true,});
        history.push("/")
        
      }
    });
  };

  return (
    <div>
      
      <div>
      <div className="loginParentDiv">
      <h2>Login</h2> 
    
        <form onSubmit={handleSubmit(login)}>
          <br />
          <input type="text" {...register("name", { required: true})} placeholder='UserName...' 
          onChange={(e)=>{
          setName(e.target.value);
          
        }}/><br/>
          {errors.name && <p className='validation'>Please Enter the userame</p>}
          <br />
          <input type="password" {...register("password", { required: true})} placeholder='Password...' 
          onChange={(e)=>{setPassword(e.target.value);}}/>
          <br/>
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

   