const mongoose =require("mongoose");

const courseSchema = new mongoose.Schema({
  name:{
      type:String,
      required:true
  },
  description:{
      type:String,
      required:true
  },
  timings:{
      type:String,
      required:true
  },
  duration:{
      type:String,
      required:true
  },
  fees:{
      type:String,
      required:true
  },
  techStack:{
      type:String,
      required:true
  },
  tages:{
      type:String,
      required:true
  },
  

});

courseSchema.index({name:"text"})

module.exports = mongoose.model("Course",courseSchema);