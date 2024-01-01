import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    profile_image: {
      type: String,
      default:'',
    },
    bio: { type: String },
    token: { type: String }
  });
  
 export default mongoose.model("User", UserSchema);
