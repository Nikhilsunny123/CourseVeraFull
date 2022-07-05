import React from "react";
import { Header } from "./Navbar.style";
import { CDBNavbar, CDBInput } from "cdbreact";
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { AuthContext } from './helpers/AuthContext';
import {useState,useContext,useEffect} from 'react'
import axios from 'axios';

function Navbar() {
 
  const{authState,setAuthState}=useContext(AuthContext);
  
  const logout=()=>{
    localStorage.removeItem("accessToken");
    setAuthState({username:"",
    id:0,
    status:false,});;
  }
  useEffect(()=>{
    axios.get('http://localhost:3001/auth/auth',{
      headers:{
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response)=>{

      if(response.data.error)
      {
        setAuthState({...authState,status:false});
      }
      else
      {
        setAuthState({username:response.data.username,
        id:response.data.id,
        status:true,
      });
      }
    });
  
  },[]);

  return (
   
    <Header style={{background:"#ffc107", color:"dc3545"}}>
          <CDBNavbar dark expand="md" scrolling className="justify-content-start">
            <CDBInput type="search" size="md" hint="Search" className="mb-n4 mt-n3 input-nav"/>
            <div className="app">
            

            {!authState.status ? (
            <>
            
            
            <Button style={{ position: "absolute",
                    right: "30px",
                    top:"10px"
                  }}>
  
            <Link to="/login" style={{color:'white'}}> Login</Link> 
          
            </Button>
            
            </>
            )  :( <button style={{ position: "absolute",
            right: "30px",
            top:"10px"
          }}  onClick={logout}>Logout</button>
              )}
            <h1 style={{ position: "absolute",
                    right: "120px",
                    top:"10px",
                    color:"black",
                    backgroundColor:"green"
                  }}>{authState.username}</h1>
              
            </div>
          </CDBNavbar>
        </Header>
        
  )
      }

export default Navbar
