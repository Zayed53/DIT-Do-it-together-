import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
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
  });
  
QuestionSchema.index({Tittle: 'text' , description: 'text'})
export default mongoose.model("Question", QuestionSchema);