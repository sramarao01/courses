const express = require("express");
const bcrypt = require("bcrypt");

const Users = require("../models/users");
const res = require("express/lib/response");
const users = require("../models/users");

const router = express.Router();


router.post("/signup",async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(req.body.password,salt);
        const data = await Users.create({
         name:req.body.name,
         email:req.body.email,
         phone:req.body.phone,
         password:password,
         admin:false
        });
       res.send(data);
       return
    }
    catch(err){
    res.send(err)
    return
    }
})

router.get("/signin",async(req,res)=>{
    try{
       const user =await Users.find({email:req.body.email});
       if(user.length == 0){
         res.send("wrong email");
         return;
       }
    const checkPass = await bcrypt.compare(req.body.password,user[0].password);
    if(checkpass){
      const token = jwt.sign({
          userId:user[0]._id,
          email:user[0].email
      },process.env.JWT_KEY,{
          expiresIn:"7days"
      
      });
      res.send(token);
      return;

    }
    else{
        res.send("wrong password");
        return;
    }
}
catch(err)
{
res.send(err)
}
})

router.post("/enroll/:courseId",async(req,res)=>{
    try{
        if(req.isAuth){
          const data = await users.findByIdAndUpdate(req.userId,{
              $push:{
                  "enrolledCourses":req.params.courseId
              }
          })
        }
        else{
            res.send("please login");
            return;
         }
        }
        catch(err){
            res.send(err)
            return
        }
    
})


module.exports = router