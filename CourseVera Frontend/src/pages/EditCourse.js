import React from 'react'
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import {useParams} from 'react-router-dom';
import {useEffect,useState} from 'react';
import Axios from 'axios';

function EditCourse() {
  let {id} =useParams();
  const [editcourse,setEditCourse]=useState({});

  useEffect(()=>{
    Axios.get(`http://localhost:3001/editcourse/byId/${id}`,
    )
    .then((responce) => {
      console.log(responce)
      setEditCourse(responce.data)
      
    });
   
}, []);

  return (
    <div>

       <div className="d-flex">
      <div>
        <Sidebar/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
        <Navbar/>
        <div style={{height:"100%"}}>
          <div style={{padding:"20px 5%",height:"calc(100% - 64px)",overflowY:"scroll"}}>
            <div style={{display:"grid", gridTemplateColumns:"repeat(1, minmax(200px, 700px))"}}>
              <div className="mt-5 w-100">
                <div className="create">
               <div className="mb-2">
                <h3> EditCourse</h3>
                    
                <div>
                  {editcourse.coursename}
                </div>

               </div>
                </div>
                
                </div>
              </div>
            </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default EditCourse