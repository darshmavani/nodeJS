import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
    path:"./data/config.env"
})

// use middleware
app.use(express.json()); 
app.use(cookieParser());


//use routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);


app.get("/",(req,res)=>{
    res.send("Nice Working");
});


//use of error middleware
app.use(errorMiddleware);

  