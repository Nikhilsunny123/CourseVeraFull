const express=require('express');
const router=express.Router()
const {Course}=require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get('/',async(req,res)=>{
    const listofCourse= await Course.findAll()
    res.json(listofCourse)
});

router.get('/byId/:id',async(req,res)=>{
    const id=req.params.id
    const course= await Course.findByPk(id);

    res.json(course)
});
router.post("/",validateToken,async(req,res)=>{
    
    const course=req.body
    await Course.create(course);
    res.json(course);
});
 
module.exports=router;