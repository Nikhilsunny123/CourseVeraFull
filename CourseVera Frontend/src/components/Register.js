import React from 'react';
import { useState } from 'react';
import "./Register.css";
import {Link} from 'react-router-dom';
import 'react-phone-number-input/style.css';
import Axios from 'axios';
import PWDRequisite from './PWDRequisite';
import PhoneInput from 'react-phone-number-input';
import { useForm } from "react-hook-form";

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [nameReg,setNameReg]=useState('');
  const [emailReg,setEmailReg]=useState('');
  const [value,setValue]=useState('');
  const [LoginStatus,setLoginStatus]=useState("");

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
  const handleRegister=()=>
  {
    {
      if(nameReg==='' || emailReg===''|| value==='' || password==='')
          {
            setError(true);
            errorMessage(true);
          }
      else
      {
                      Axios.post('http://localhost:3001/register',
                      { username:nameReg,
                        email:emailReg,
                        phone:value,
                        password:password}).then(
                        (responce,err)=>
                        {
                          if (responce) {
                            setSubmitted(true);
                            setError(false)
                            console.log(responce);
                              
                            setLoginStatus(<p style={{color:"blue",fontweight:"bold"}}>{responce.data.message}</p>);
                              
                           
                          
                            
                          }
                          else
                          {
                         console.log("exist")
                          }
                          
                        });
                      } 
           
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
      <div className="signupParentDiv"
      >
        <div className='messages'>
          {errorMessage()}
          {LoginStatus}
        </div>
        <form onSubmit={handleSubmit(handleRegister)}>
          <h3>Create Account</h3>
          <br/>
          <input type="text" {...register("name", { required: true})}
          placeholder="enter username" 
          
        onChange={handleName} 
        value={nameReg}/><br/>
        {errors.name && <p className='validation'>Please Enter the username</p>}
        <br/>
        <input type="email"  
        {...register("email", {
          required: "Please Enter the email",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address"
          }
        })}
        placeholder= "enter email "
        onChange={handleEmail} 
        value={emailReg} 
        />  <br/>
        {errors.email && <p className='validation'>{errors.email.message}</p>}
        <br/>
        <PhoneInput
          value={value} 
          onChange={setValue}
          name ="phonenumber"
          placeholder="Enter phone number"  
          type="phone" 
          
          
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
          <button type="submit">Register</button>
        </form>
        <Link to="/login" style={{color:'blue'}}>Login</Link>
      </div>
    </div>
  );
}
