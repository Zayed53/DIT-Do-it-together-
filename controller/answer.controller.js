import Answer from '../models/answer.mode.js'

export const postAnswer = async(req, res) => {
    try{
        const {ans, typ} =req.body;
        const postID=req.params.id;
        const owner=req.user.id;
    
        if(!ans || !typ ||!postID){
            return res.status(400).json({Error:"Provide necessary informations"});
        }
    
        if(!owner){
            return res.status(400).json({Error:"You are not Logged in. Login first"});
        }

        const answer = new Answer({
            parent_post: postID,
            answer:ans,
            post_type: typ,
            owner: owner
        })

        await answer.save()

        return res.status(200).json({message:"Answer is post"})
    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }
  
}

export const getanswer = async (req, res) => {
    try{
        const postID=req.params.id;

        const answer= await Answer.find({parent_post:postID});
    
        return res.status(200).json({answer});
    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }

}

export const getownanswer = async (req, res) => {
    try{
        const ownerid=req.user.id;
        if(!ownerid){
            return res.status(400).json({Error:"You are not Logged in. Login first"});
        }
        const answer= await Answer.find({owner:ownerid});
    
        return res.status(200).json({answer});
    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }

}

export const deleteAnswer = async(req, res) => {
    try{
        const ansid=req.params.id;

        const answer = await Answer.findById(ansid);
    
        if(!answer){
            return res.status(404).json({ error: "answer not found" });
        }
        if(!answer.owner==req.user.id){
            return res.status(404).json({ error: "Wrong Author" });
        }
    
        await Answer.deleteOne({_id:ansid});
    
        return res.status(200).json({message:"Answer deleted"});        
    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }
    
}

export const updateanswer = async(req, res) => {
    try{
        const ansid=req.params.id;
        const {newtext} = req.body
        const answer = await Answer.findById(ansid);
        
        if(!newtext){
            return res.status(404).json({ error: "Empty Value is provided" });
        }

        if(!answer){
            return res.status(404).json({ error: "answer not found" });
        }

        if(!answer.owner==req.user.id){
            return res.status(404).json({ error: "Wrong Author" });
        }

        answer.answer=newtext;
    
        await answer.save();
    
        return res.status(200).json({message:"Answer updated"});  
    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }
    
}