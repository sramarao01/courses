const express = require("express");
const res = require("express/lib/response");
const courses = require("../models/courses");

const router = express.Router();

router.post("/addCourse",async (req,res)=>{
    try{
        if(req.isAuth){
            if(req.admin){
                const data = await courses.create({
                   name:req.body.name,
                   description:req.body.description, 
                   timings:req.body.timings, 
                   duration:req.body.duration, 
                   fees:req.body.fees, 
                   techStack:req.body.techStack, 
                   tags:req.body.tags,
                })
            }
            else{
                res.send("Unauthorized Access")
                return;
            }
        }
        else{
            res.send("please login");
            return;
        }
    }
    catch(err){
        res.send(err);
        return;
    }
})

router.post("/modify/:courseId",async(req,res)=>{
    try{
        if(req.isAuth){
            if(req.admin){
                const data = await courses.findByIdAndUpdate(req.params.courseId,{
                    name:req.body.name,
                    description:req.body.description, 
                    timings:req.body.timings, 
                    duration:req.body.duration, 
                    fees:req.body.fees, 
                    techStack:req.body.techStack, 
                    tags:req.body.tags,
                })
                res.send(data);
                return;
            }
            else{
                res.send("Unauthoraised access")
            }
           
        }
        else{
            res.send("please login")
            return
        }
    }
    catch(err){
        res.send(err);
        return;
    }
})

router.get("/filterCourse",async(req,res)=>{
    try{
        const data =[]
        const data2 ={}
        const filters = req.query;
        if(filters){
         const timings = filters.timings;
         const duration = filters.duration;
         const fees = filters.fees;
         const tags = filters.tags;
         const techStack = filters.techStack;

         if(filters){
            let temp = await courses.find({timings});
            data.push(...temp);
            data2.timings = temp;


         }
         if(fees){
            data = await courses.find({fees});
            data.push(...temp);
            data2.timings = temp;
         }
         if(tags){
             temp = await courses.find({
               tags:{$in : tags}
             });
             data.push(...temp);
             data2.tags = temp;
         }
         if(techStack){
             temp = await courses.find({
               tags:{$in : techStack}
             });
             data.push(...temp);
             data2.techStack = temp;
         }

        }

    
       else{
        data =await courses.find({});
        res.send(data);
        return;
       }
    }
      catch(err){
        res.send(err);
        return;
    }
})

module.exports = router