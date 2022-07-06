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
    
    const course=req.body;
    await Course.create(course);
    res.json(course);
});

router.put("/title",validateToken,async(req,res)=>{
    
  const {newTitle,id}=req.body;
  await Course.update({title:newTitle},{where:{id:id}})
  res.json(newTitle);
});

router.put("/content",validateToken,async(req,res)=>{
    
  const {newContent,id}=req.body;
  await Course.update({content:newContent},{where:{id:id}})
  res.json(newContent);
});


router.put("/price",validateToken,async(req,res)=>{
    
  const {newPrice,id}=req.body;
  await Course.update({price:newPrice},{where:{id:id}})
  res.json(newPrice);
});

router.put("/duration",validateToken,async(req,res)=>{
    
  const {newContent,id}=req.body;
  await Course.update({content:newContent},{where:{id:id}})
  res.json(newContent);
});

router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId;
    await Course.destroy({
      where: {
        id: postId,
      },
    });
  
    res.json("DELETED SUCCESSFULLY");
  });

module.exports=router;