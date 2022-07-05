import React from 'react'
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import {useParams} from 'react-router-dom';
import {useEffect,useState,useContext} from 'react';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../helpers/AuthContext';


function EditCourse() {


  const history=useHistory();
  const{authState}=useContext(AuthContext);

  let {id} =useParams();
  const [editcourse,setEditCourse]=useState({});

  useEffect(()=>{
    if(!authState.status)
    {
      history.push("/login");
    } 
    else
    {
    Axios.get(`http://localhost:3001/course/byId/${id}`,
    )
    .then((responce) => {
      console.log(responce)
      setEditCourse(responce.data)
      
    });
  }
   
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
             
                <div>
                  <div>
                  {editcourse.title}
                  </div>
                  <div>
                  {editcourse.content}
                  </div>
                  <div>
                  {editcourse.duration}
                  </div>
                  <div>
                  {editcourse.price}
                  </div>
  <table style={{ position: "absolute",
                    right: "90px",
                    top:"10px",
                    color:"black"
                  }}>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  </table>
                  
                  
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