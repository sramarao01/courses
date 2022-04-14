const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
  name:{
      type:String,
      required:true
  },
  email:{
      type:String,
      required:true
  },
  phone:{
      type:Number,
      required:true
  },
  password:{
      type:String,
      required:true
  },
  admin:{
      type:Boolean,
      required:true
  },
  courseEnrolled:{
      type:[String],
      required:false
  }
  

})
module.exports = mongoose.model("User",userSchema);