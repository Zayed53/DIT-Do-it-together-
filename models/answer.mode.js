import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
    parent_post: {
        type: String,
        required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    post_type: {
      type: String,
    },
    owner: {
      type: String,
      required: true,
  }
  });
  
 export default mongoose.model("Answer", AnswerSchema);