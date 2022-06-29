const express=require("express");
const mysql=require("mysql");

const cors=require("cors");
const bodyparser=require("body-parser")
const jwt=require("jsonwebtoken");
const bcrypt= require('bcrypt');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const bodyParser = require("body-parser");


const saltRounds=10;
const app=express();

app.use(express.json());
app.use(cors({
    origin : ['http://localhost:3000'],
    methods : ["GET","POST"],
    credentials :true
}));

app.use(cookieParser());      //important while using cookie
app.use(bodyParser.urlencoded({extended:true})); //important while using cookie


app.use(
    session({
      key: "userId",
      secret: "subscribe",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 60 * 60 * 24,
      },
    })
  );

const db=mysql.createConnection({
    user: "root",
    host:"localhost",
    password: "password",
    database:"coursebeta",
});
app.post('/register',(req,res)=>{

    const name=req.body.name;
    const email=req.body.email;
    const phone=req.body.phone;
    const password=req.body.password;

    bcrypt.hash(password,saltRounds,(err,hash)=>{

        if(err){
            console.log(err)
        }

        db.query("SELECT COUNT(*) AS cnt FROM userreg WHERE email = ? ",
        req.body.email,(err,data)=>
        {
          if(err)
          {
              console.log(err);
          }
          else
          {
              if(data[0].cnt>0)
              {
                 res.send({message:"existing user"});
              }
              else
              {
              db.query("SELECT COUNT(*) AS cnt FROM userreg WHERE name = ? ",
              req.body.name,(err,data)=>
              {
                  if(err)
                  {
                      console.log(err);
                  }
                  else
                  {
                      if(data[0].cnt>0)
                      {
                          res.send({message:"existing user"});
                      }
                      else
                      {
                          
                              db.query("INSERT INTO userreg(name,email,phone,password) VALUES (?,?,?,?)",
                              [name,email,phone,hash],
                              (err,result)=>
                              {
                                  
                                  console.log(err);
                                  
                                
                              });
                      }
                  }
              });
          }
      }
      
      });

    })
    
  


});

app.post('/createcourse',(req,res)=>{

    const coursename=req.body.coursename;
    const coursecontent=req.body.coursecontent;
    const courseduration=req.body.courseduration;
    const courseprice=req.body.courseprice;
    
    db.query("SELECT COUNT(*) AS cnt FROM createcourse WHERE coursename = ? ",
      req.body.coursename,(err,data)=>
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(data[0].cnt>0)
            {
               res.send({message:"existing course"});
            }
            else
            {
                     db.query("INSERT INTO createcourse(coursename,coursecontent,courseduration,courseprice) VALUES (?,?,?,?)",
                     [coursename,coursecontent,courseduration,courseprice],
                                (err,result)=>
                                {
                                    if(result.body<=0)
                                    {
                                    console.log(err);
                                    }
                                    else
                                    {
                                        res.send({message :"Registered Successfully"});
                                    }
                      });
            }
        }
    });
});

app.get('/coursedetails',(req,res)=>{

    db.query(
    "SELECT * FROM createcourse",
    (err,result)=>{
        if(err){
            res.send({err:err})
        }
        else {
            res.send(result);
        }

    })
})

app.delete('/deletecourse/:coursename',(req,res)=>{
    const name=req.body.coursename;
    
      const sqlDelete = "DELETE FROM createcourse WHERE coursename= ?";
    db.query(sqlDelete,name, (err,result)=>{
        if(err)
            console.log(err)
        

    })
        

})


//middleware
// function verifyToken(req,res,next)
// {
//     let authHeader=req.headers.authorization;
//     if(authHeader==undefined){
//         res.status(401).send({error:"no token provdied"})
//     }
//     let token =authHeader.split(" ")[1]
//     jwt.verify(token,"secret",function(err,decoded){
//         if(err){
//             res.status(500).send({error:"auth failed"})
//         }
//         else
//         {
//             next();
//         }
//     })
// }

//middleware

const verifyJWT=(req,res,next)=>{
    const token=req.headers["x-access-token"]

    if(!token){
        res.send("We need a token , please give")
    }
    else
    {
        jwt.verify(token,"jwtSecret",(err,decoded)=>
        {
            if(err){
              res.json({auth:false,message:"U failed to authenticate"});  
            }
            else
            {
                req.id=decoded.id;
                next();
            }

        })
    }
}

app.get('/isUserAuth',verifyJWT,(req,res)=>{

    res.send("AUthenticated");
})

app.get("/login",(req,res)=>{
    if(req.session.name){
        res.send({loggedLn:true,user:req.session.name})
    }
    else 
    {
        res.send({loggedLn:false})
    }
})

app.post('/login',(req,res)=>{
    const name=req.body.name;
    const password=req.body.password;

    db.query(
    "SELECT * FROM userreg WHERE name = ?;",
    name,
    (err,result)=>{
        if(err){
            res.send({err:err})
           
        }
        
            if (result.length>0)
            {

                bcrypt.compare(password,result[0].password,(error,response)=>{


                    if(response){

                        const id=result[0].id
                        const token=jwt.sign({id},"jwtSecret",{
                            expiresIn :300,
                        })
                        req.session.name = result;

                        res.json({auth:true,token:token,result:result})
                        
                    }
                    else
                    {
                        res.send({message :"Wrong name/password combination!"});
                    }
                });
                        // const resp={
                        //     id : result[0].id,
                        //     display_name :result[0].display_name
                            
                        // }
                        // let token=jwt.sign(resp,"secret",{expiresIn:200})
                        // res.status(200).send({auth:true,token:token});
            }
            else 
            {
                res.send({message :"User Doesnt exist"});
            }
        

    });
});


app.listen(3001,()=>{
    console.log("server running")
});