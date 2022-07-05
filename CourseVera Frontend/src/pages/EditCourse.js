import React from 'react'
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import {useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import {useEffect,useState,useContext} from 'react';
import Table from 'react-bootstrap/Table'

import {useHistory} from 'react-router-dom';
import {AuthContext} from '../helpers/AuthContext';
import axios from 'axios';
import './EditCourse.css'

function EditCourse() {

  let history=useHistory();
  const{authState}=useContext(AuthContext);

  let {id} =useParams();
  const [editcourse,setEditCourse]=useState({});
  const [postObject, setPostObject] = useState({});


  //edit




  useEffect(()=>{
    if(!localStorage.getItem("accessToken"))
    {
      history.push("/login");
    } 
    else
    {
    axios.get(`http://localhost:3001/course/byId/${id}`,
    )
    .then((responce) => {
      console.log(responce)
      setEditCourse(responce.data)
      
    });
  }
    
}, []);


const deleteCourse=(id)=> {
  axios
    .delete(`http://localhost:3001/course/${id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then(() => {
      history.push("/coursedetails");
    });
  }
  
  const editPost = (option) => {
    if (option === "title") {
      let newTitle = prompt("Enter New Title:");
      axios.put(
        "http://localhost:3001/course/title",
        {
          newTitle: newTitle,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );

      setPostObject({ ...postObject, title: newTitle });
      } 
      else 
      {
      let newPostText = prompt("Enter New Content:");
      axios.put(
        "http://localhost:3001/course/content",
        {
          newContent: newPostText,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );

      setPostObject({ ...postObject, content: newPostText });
    }
  };


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
                     {/* <Table className='table'  striped bordered hover variant="dark">
                                    
                        <tbody>
                          <tr>
                            <td>CourseName</td>
                            <td>{editcourse.title}</td>
                            
                          </tr>
                          <tr>
                            <td>CourseContent</td>
                            <td>{editcourse.content}</td>
                            
                          </tr>
                          <tr>
                            <td>CourseDuration</td>
                            <td>{editcourse.duration}</td>
                          </tr>
                          <tr>
                            <td>CoursePrice</td>
                            <td></td>
                          </tr>
                        </tbody>
                      // </Table> */}
                      

          <div className="post" id="individual">
          <div className="title" onClick={()=>editPost("title")}> {postObject.title} </div>
          <div className="body" onClick={()=>editPost("content")}>{postObject.content}</div>
          <div className="footer" onClick={()=>editPost("price")}>Price :{postObject.price}</div>
          <div className="footer"onClick={()=>editPost("duration")}>Duration :{postObject.duration}
            
          </div>
        </div>
        <Button className='deletebutton' onClick={()=>{deleteCourse(editcourse.id)}}>Delete</Button>
                          <Button className='editbutton' >Edit</Button>
                  
                  
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