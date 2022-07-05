const express=require("express");
const cors=require("cors");
const db=require('./models');
const jwt=require("jsonwebtoken");
const bcrypt= require('bcrypt');
const saltRounds=10;
const app=express();
app.use(cors());
app.use(express.json());

//Routers
const postRouter=require('./routes/Course')
app.use("/course", postRouter);
const usersRouter=require('./routes/Users')
app.use("/auth", usersRouter);

// app.post('/register',(req,res)=>{

//     const username=req.body.username;
//     const email=req.body.email;
//     const phone=req.body.phone;
//     const password=req.body.password;

//     bcrypt.hash(password,saltRounds,(err,hash)=>{

//         if(err){
//             console.log(err)
//         }

//         db.query("SELECT COUNT(*) AS cnt FROM userreg WHERE email = ? ",
//         req.body.email,(err,data)=>
//         {
//           if(err)
//           {
//               console.log(err);
//           }
//           else
//           {
//               if(data[0].cnt>0)
//               {
//                  res.send({message:"existing user"});
//               }
//               else
//               {
//               db.query("SELECT COUNT(*) AS cnt FROM userreg WHERE username = ? ",
//               req.body.username,(err,data)=>
//               {
//                   if(err)
//                   {
//                       console.log(err);
//                   }
//                   else
//                   {
//                       if(data[0].cnt>0)
//                       {
//                           res.send({message:"existing user"});
//                       }
//                       else
//                       {
                          
//                               db.query("INSERT INTO userreg(username,email,phone,password) VALUES (?,?,?,?)",
//                               [username,email,phone,hash],
//                               (err,result)=>
//                               {  
//                                  if(err){
                                    
//                                     console.log(err);
//                             }
//                             else
//                             {
                              
//                                 res.json({ message : "Registered user" })
//                             }
                                
//                               });
//                       }
//                   }
//               });
//           }
//       }
      
//       });

//     })
// });

// app.post('/createcourse',(req,res)=>{

//     const coursename=req.body.coursename;
//     const coursecontent=req.body.coursecontent;
//     const courseduration=req.body.courseduration;
//     const courseprice=req.body.courseprice;
    
//     db.query("SELECT COUNT(*) AS cnt FROM createcourse WHERE coursename = ? ",
//       req.body.coursename,(err,data)=>
//     {
//         if(err)
//         {
//             console.log(err);
//         }
//         else
//         {
//             if(data[0].cnt>0)
//             {
//                res.json({message:"existing course"});
//             }
//             else
//             {
//                      db.query("INSERT INTO createcourse(coursename,coursecontent,courseduration,courseprice) VALUES (?,?,?,?)",
//                      [coursename,coursecontent,courseduration,courseprice],
//                                 (err,result)=>
//                                 {
//                                     if(err)
//                                     {
//                                     console.log(err);
//                                     }
//                                     else
//                                     {
//                                         res.json({message :"Registered Successfully"});
//                                     }
//                       });
//             }
//         }
//     });
// });

// app.get('/coursedetails',(req,res)=>{
//     db.query(
//     "SELECT * FROM createcourse",
//     (err,result)=>{
//         if(err){
//             res.send({err:err})
//         }
//         else {
//             res.send(result);
//         }

//     })
// })

// app.get('/editcourse/byId/:id',(req,res)=>{

//     const id=req.body.courseid; 
        
//     db.query(
//     "SELECT * FROM createcourse where courseid = ?",
//     req.body.courseid,
//     (err,result)=>{
//         if(err){
//             res.send({err:err})
//         }
//         else {
//             res.send(result);
//         }

//     })
// })

// app.delete('/deletecourse/:coursename',(req,res)=>{
//     const name=req.body.coursename;
    
//       const sqlDelete = "DELETE FROM createcourse WHERE coursename= ?";
//     db.query(sqlDelete,name, (err,result)=>{
//         if(err)
//             console.log(err)

//     })
        
// })

// app.post('/login',(req,res)=>{
//     const username=req.body.username;
//     const password=req.body.password;

//     db.query(
//     "SELECT * FROM userreg WHERE username = ?;",
//     username,
//     (err,result)=>{
//         if(err){
//             res.send({err:err})
           
//         }
        
//             if (result.length>0)
//             {

//                 bcrypt.compare(password,result[0].password,(error,response)=>
//                 {
//                     if(response){

//                         res.send(result)

//                     }
//                     else
//                     {
//                         res.json({ message : "Wrong Details" })
         
//                     }

//                 });
//             }
//             else 
//             {
//                 res.json({message : "no user exists" })
//             }
        

//         }   
//     );
// });

db.sequelize.sync().then(()=>{
app.listen(3001,()=>{
    console.log("server running")
});
});