import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    Tittle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: [String],
    },
    path: {
      type: String,
      
    },
  });
 
  VideoSchema.index({Tittle: 'text' , description: 'text'})
 export default mongoose.model("Video", VideoSchema);