import React from "react";
import { Header } from "./Navbar.style";
import { CDBNavbar, CDBInput } from "cdbreact";
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

function Navbar() {

  
  
  return (
    <Header style={{background:"#ffc107", color:"dc3545"}}>
          <CDBNavbar dark expand="md" scrolling className="justify-content-start">
            <CDBInput type="search" size="md" hint="Search" className="mb-n4 mt-n3 input-nav"/>
            <div className="app">
            <>
            <Button style={{ position: "absolute",
  right: "30px",
  top:"10px"
  
 
}}>
            <Link to="/login" style={{color:'white'}}> Login</Link> 
            
                   </Button>
            </>
              
        
            </div>
          </CDBNavbar>
        </Header>
  )
}

export default Navbar
