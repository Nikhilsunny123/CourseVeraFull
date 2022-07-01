import React from 'react';
import { useState } from 'react';
import "./Register.css";
import {Link} from 'react-router-dom';
import 'react-phone-number-input/style.css';
import Axios from 'axios';
import validator from 'validator';
import PWDRequisite from './PWDRequisite';
import PhoneInput from 'react-phone-number-input';

export default function Signup() {



  const [nameReg,setNameReg]=useState('');
  const [emailReg,setEmailReg]=useState('');
  const [value,setValue]=useState('');

  const [password, setPassword] = useState("");
  const [pwdRequiste, setPWDRquisite] = useState(false);
  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
    specialCharCheck: false,
  });
  const [submitted,setSubmitted]=useState(false);
  const [error,setError]=useState(false);

  const handleOnChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOnFocus = () => {
    setPWDRquisite(true);
  };

  const handleOnBlur = () => {
    setPWDRquisite(false);
  };

  const handleOnKeyUp = (e) => {
    const { value } = e.target;
    const capsLetterCheck = /[A-Z]/.test(value);
    const numberCheck = /[0-9]/.test(value);
    const pwdLengthCheck = value.length >= 8;
    const specialCharCheck = /[!@#$%^&*]/.test(value);
    setChecks({
      capsLetterCheck,
      numberCheck,
      pwdLengthCheck,
      specialCharCheck,
    });
  };
 
 const handleName=(e)=>{
    setNameReg(e.target.value);
    setSubmitted(false)
  }
  
  const handleEmail=(e)=>
  {
      setEmailReg(e.target.value);
      setSubmitted(false)
  
  }
  const handleSubmit=(event)=>
  {
    if(nameReg==='' || emailReg===''|| value==='' || password==='')
        {
          setError(true);
        }
        else
        {
                  if(validator.isEmail(emailReg))
                  {
                    Axios.post('http://localhost:3001/register',
                    { username:nameReg,
                      email:emailReg,
                      phone:value,
                      password:password}).then(
                      (responce)=>
                      {
                        
                         
                            setSubmitted(true);
                            setError(false)
                            console.log(responce);
                        
                      })
                    } 
                  else
                  {
                        setError(true)
                        setSubmitted(false);
                        setEmailReg("enter valid email");
                  }
           event.preventDefault();
        }
  }
  const successMessage=()=>{
    return (
      <div className='success'
      style={{display:submitted ? '' : 'none', }}>
      <h4 style={{color:"green"}}>User {nameReg} successfully registered</h4>
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
      <div className="signupParentDiv"
      >
        <div className='messages'>
          {errorMessage()}
          {successMessage()}
        </div>
        <form >
          <h3>Create Account</h3>
          <br/>
          <input type="text" 
          placeholder="enter username" 
          required
        onChange={handleName} 
        value={nameReg}/><br/>
        <br/>
        <input type="email"  
        required
        placeholder= "enter email "
        onChange={handleEmail} 
        value={emailReg} 
        />  <br/>
        <br/>
        <PhoneInput
          placeholder="Enter phone number" required
         
          
          value={value}
          type="phone"
          onChange=
            {
              setValue
              }
          />
        <br/>
        <br/>
           <input type="password"
           placeholder="enter Password.."
           value={password}
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onKeyUp={handleOnKeyUp}
            required
       />
       <br/>
       <br/>
       
        {pwdRequiste ? (
          <PWDRequisite
            capsLetterFlag={checks.capsLetterCheck ? "valid" : "invalid"}
            numberFlag={checks.numberCheck ? "valid" : "invalid"}
            pwdLengthFlag={checks.pwdLengthCheck ? "valid" : "invalid"}
            specialCharFlag={checks.specialCharCheck ? "valid" : "invalid"}
          />
        ) : null}
        
        <br/>
        <br/>          
          <button type="submit" onClick={handleSubmit}>Register</button>
        </form>
        <Link to="/login" style={{color:'blue'}}>Login</Link>
      </div>
    </div>
  );
}
