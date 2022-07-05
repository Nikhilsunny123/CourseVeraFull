import React, { useEffect } from "react";

import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import "./Dashboard.css";

export const Dashboard = () => {
  
  return ( 
    <div className="dashboard d-flex">
    	<div>
      	<Sidebar/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
        <Navbar/>
        <div style={{height:"100%"}}>
	        <div style={{height:"calc(100% - 64px)", overflowY:"scroll"}}>
             
	          <h1 style={{color:"blue",right:20}}></h1>
	        </div>
        </div>
      </div>
    </div>
  );
}