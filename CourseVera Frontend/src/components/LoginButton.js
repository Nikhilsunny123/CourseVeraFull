import React,{useEffect, useState} from 'react';
import Axios from 'axios';
import './Login.css';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton';
import axios from 'axios';

function LoginButton() {

  const history=useHistory();
  
  const [username,setName]=useState('');
  const [password,setPassword]=useState('');

  const [LoginStatus,setLoginStatus]=useState(false);

 

  Axios.defaults.withCredentials=true; //for session

  useEffect(()=>{
    Axios.get("http://localhost:3001/login").then((responce)=>{
      if(responce.data.loggedIn===true){
        setLoginStatus(responce.data.username[0].username)
      }
      
    });
  },[]);
  
  const login = (event) => {
    Axios.post("http://localhost:3001/login", {
      username:username,
      password:password,
    }).then((response) => {
      if (!response.data.auth) {
        setLoginStatus(false);
      } else {
        
        localStorage.setItem("token",response.data.token)
       setLoginStatus(true);
        // setTimeout(()=>{
        //   history.push('/');
        // },4000)
      }
    });
    event.preventDefault();
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
    
        <form>
        
          <br />
          <input type="text" required placeholder='UserName...' onChange={(e)=>{
          setName(e.target.value);
          
        }}/><br/>
          
          <br />
          <input type="password" required placeholder='Password...' onChange={(e)=>{
          setPassword(e.target.value);
          
        }}/><br/>
          <br />
          <button type="submit" onClick={login}>Login</button>
          <br>
          </br>
          
        </form>
        
        <Link to="/register" style={{color:'blue'}}>Signup</Link>
        
        <h1 > {LoginStatus && (
          <button onClick={userAuthenticated}>check if authenticated </button> 
          )}
              </h1>
      </div>
    </div>
    </div>
  )
}

export default LoginButton;





     
   