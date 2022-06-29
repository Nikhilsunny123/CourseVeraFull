import React,{useState} from 'react';
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
  
  const login=(event)=>
  {
     Axios.post('http://localhost:3001/login',
     {name:name,
       password:password
     }).then(
      (responce)=>
      {
        if(responce.data.message)
        {
          setLoginStatus(responce.data.message);
          console.log("login not success");
          
        }
        else
        {
          setLoginStatus(`Login Success`);
          console.log("login success");
          setTimeout(()=>{
            history.push('/');
          },2000)
        }    

    })
    
    event.preventDefault();
  }
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





     
   