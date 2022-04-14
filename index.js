const express = require("express");
const {json,urlencoded}= require("express");

const userRouter = require("./routers/user");
const coursesRouter = require("./routers/courses");
const mongoose  = require("mongoose");
const auth = require('./middlewares/auth')
const app = express();

mongoose.connect(process.env.monogodb);

app.use(json());
app.use(urlencoded({extended:false}));
app.use(auth);

app.get('/',(req,res) => {
  res.send('server running')
})

app.use("/user",userRouter);
app.use("/courses",coursesRouter)

app.listen(process.env.PORT || 5000);
