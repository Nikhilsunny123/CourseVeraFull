const express=require('express');
const router=express.Router();
const bcrypt = require("bcrypt");
const {Users}=require('../models')
const {sign}=require("jsonwebtoken")
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", async (req, res) => {

    const { username,email,phone,password } = req.body;
    Users.count({ where: { username: username} })
      .then(count => {
        if (count != 0) 
        {
          res.json({message:"existing user"});
        }
        else
       {


                bcrypt.hash(password, 10).then((hash) => {
                  Users.create({
                    username: username,
                    email:email,
                    phone:phone,
                    password: hash,
                  });
                  res.json({message:"Registered Succesfully"});
                });
        }
      });
        
  });
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    const user = await Users.findOne({ where: { username: username } });
  
    if (!user) return res.json({ error: "User Doesn't Exist" });
  
    bcrypt.compare(password,user.password).then((match) => {
      if (!match) return res.json({ error: "Wrong Details " });
      const accessToken = sign(
        { username: user.username, id: user.id },
        "importantsecret"
      );
      res.json({token:accessToken,username:username,id:user.id});
    });
  });

  router.get('/auth',validateToken,(req,res)=>{
    res.json(req.user);
  });
module.exports=router;