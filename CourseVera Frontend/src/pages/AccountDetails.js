import React from 'react'
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

function AccountDetails() {
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
                <h3> AccountDetails</h3>
                    





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

export default AccountDetails