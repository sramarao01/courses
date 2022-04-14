const express = require("express");
const {json,urlencoded}= require("express");

const userRouter = require("./routers/user");
const coursesRouter = require("./routers/courses");
const { default: mongoose } = require("mongoose");

const app = express();

mongoose.connect(process.env.monogodb);

app.use(json());
app.use(urlencoded({extended:false}));
app.use(auth);

app.use("/user",userRouter);
app.use("/courses",coursesRouter)

app.listen(5000);
