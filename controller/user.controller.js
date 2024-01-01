import User from '../models/userModel.js'
import bcrypt from "bcrypt";
import passport from "passport";

export const postRegister = async (req, res) => {
    console.log("req check", req.body)
    const {name,  email, password, bio } = req.body;

  
    console.log(name)
    console.log(email)
    console.log(password)
  
  const errors=[]
  if (!name || !email || !password || !bio ) {
    errors.push("All fields are required!");
  }
  const user= await User.findOne({ email: email });
  if(user){
    return res.status(400).json({error:"Email is already in use"});
  }

  try{
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(password, salt);
    const newUser= new User({
        name:name,
        email:email ,
        password:hashedNewPassword ,
          
        bio: bio,
    });
    await newUser.save();
    
    return res.status(200).json({ message: "Profile created successfully" });
   
  }catch (error) {
    console.log("Error: ", error);
    return res.status(400).json({ error: error.message });
  }
  
  };

  export const getScope = passport.authenticate("google", {
    scope: ["email", "profile"]
  }
  );
  // export const getCallback = passport.authenticate("google", {
  //   successRedirect: "/User/welcome",
  //   failureRedirect: "/User/google/failure",
  //   successFlash: true,
  //   failureFlash: true
  // });
  export const postlogin = (req, res, next) => {
    console.log("came in postlogin", req.body);
  
    passport.authenticate("User", (err, user, info) => {
      if (err) {
        console.error("Authentication error:", err);
        return res.status(500).json({ error: "Authentication error" });
      }
  
      if (!user) {
        console.error("Authentication failed:", info.message);
        return res.status(401).json({ error: info.message });
      }
      user.password = undefined;
      req.logIn(user , (err) => {
        console.log("User is set", user);
        if(err){
          console.error(err)
          return res.status(500).json({ error: "Session is not set" });
        }
        else{
          res.status(200).json({ message: "Logged In", User: user });
        }
      }
      )
      // console.log("check", req.isAuthenticated());
      console.log("user checked", req.user);
      // console.log("if session is set", req.user)
      // Authentication succeeded
      
    })(req, res, next);
  };

  export const logout = (req, res) => {
    req.logout((err) => {
      if (err) {
        res.json({ error: err });
      } else res.status(200).json({ message: "Logged out" });
    });
  };
  export const getFailure = (req, res) => {
    res.send("USER NOT FOUND!!! >");
  };

  export const welcome = (req, res) => {
    res.send("login Done");
  };


  export const getCallback = (req, res, next) => {
    passport.authenticate("google", (err, user, info) => {
      if (err) {
        console.error("Authentication error:", err);
        return res.status(500).json({ error: "Authentication error" });
      }
  
      if (!user) {
        console.error("Authentication failed:", info.message);
        return res.status(401).json({ error: info.message });
      }
      req.logIn(user , (err) => {
        console.log("User is set", user);
        if(err){
          console.error(err)
          return res.status(500).json({ error: "Session is not set" });
        }
        else{
          return res.status(200).json({ message: "Logged In", User: user });
        }
      }
      )
      // console.log("check", req.isAuthenticated());
      console.log("user checked", req.user);
      // console.log("if session is set", req.user)
      // Authentication succeeded
      
    })(req, res, next);
  }