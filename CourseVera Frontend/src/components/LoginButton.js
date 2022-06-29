import React,{useEffect, useState} from 'react';
import Axios from 'axios';
import './Login.css';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton';

function LoginButton() {

  const history=useHistory();
  
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');

  const [LoginStatus,setLoginStatus]=useState('');

  Axios.defaults.withCredentials=true; //for session
  
  const login=(event)=>
  {
     Axios.post('http://localhost:3001/login',
     {name:name,
       password:password
     }).then((responce)=>{
        if(responce.data.message)
        {
          setLoginStatus(responce.data.message);
          console.log("login not success");
          
        }
        else
        {
          setLoginStatus(responce.data[0].name)
          
          console.log("login success");
          setTimeout(()=>{
            history.push('/');
          },4000)
        }    

    });
    
    event.preventDefault();
  };

  useEffect(()=>{
    Axios.get("http://localhost:3001/login").then((responce)=>{
      if(responce.data.loggedIn===true){
        setLoginStatus(responce.data.name[0].name)
      }
      
    });
  },[]);
  return (
    <div>
      
      <div>
      <div className="loginParentDiv">
      <h2>Login</h2> <CloseButton style={{width:"30px" ,height:"30px" , position: "absolute",top: "8px",right: "16px"}} />
    
      
        <form>
        
          
          <br />
          <input type="text" placeholder='UserName...' onChange={(e)=>{
          setName(e.target.value);
        }}/><br/>
          
          <br />
          <input type="password" placeholder='Password...' onChange={(e)=>{
          setPassword(e.target.value);
        }}/><br/>
          <br />
          <button type="submit" onClick={login}>Login</button>
          <br>
          </br>
          
        </form>
        
        <Link to="/register" style={{color:'blue'}}>Signup</Link>
        
        <h1 > {LoginStatus}</h1>
      </div>
    </div>
    </div>
  )
}

export default LoginButton;





     
   