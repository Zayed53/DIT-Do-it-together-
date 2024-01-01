import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import {initializepassport} from "./config/passport.js";







const port = process.env.PORT || 4000;
const app = express();
dotenv.config();

app.use('/Storage/uploadVideo', express.static('./Storage/uploadVideo'));

app.use(express.json()); 
app.use(cookieParser());
app.use(cors({origin:"http://localhost:3000", credentials: true}));

app.use(session({
    secret: "secret",
    resave: true ,
    saveUninitialized: true ,
    
  }))

initializepassport(passport)
app.use(passport.initialize());

app.use(passport.session()) ;

//ROute section
import UserRoute from './router/user.router.js';
import QuestionRoute from  './router/question.router.js'
import videoRoute from './router/video.router.js'
import answerRoute from './router/answer.router.js'

app.use("/User", UserRoute);
app.use("/Question", QuestionRoute);
app.use("/Video", videoRoute);
app.use("/Answer", answerRoute);


const connection = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to database successfully!");
    } catch (error) {
      console.log(error);
    }
};








app.use((err, req, res, next)=>{
    console.error("Error:", err);
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
  
    return res.status(errorStatus).send(errorMessage);
});


app.listen(port, function(){
    connection();
    console.log(`Server is running on Port ${port}`);
});