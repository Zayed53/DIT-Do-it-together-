import Question from '../models/question.mode.js';
import Answer from '../models/answer.mode.js'

export const postQuestion = async (req, res) => {
    const {tittle, desc, category} = req.body;
    const owner_id=req.user.id;
    console.log("owner Id", owner_id);

    try{
        const question= new Question({
            owner:owner_id,
            Tittle:tittle,
            description:desc,
            category:category
        })

        await question.save();

        return res.status(200).json({message:"Question uploaded successfully"});

    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }
    
}

export const searchResult = async (req, res) => {
    try{
        const query= req.query.data

        const result = await Question.find({$text : {$search: query}}).sort({score: { $meta: "textScore" }}).limit(20);

        if(result.length===0){
            return res.status(200).json({message:"No resluts found"});
        }
    
        return res.status(200).json({Result: result});
    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }

}

export const getownquestion = async (req, res) => {
    try{
        const ownerid=req.user.id;
        if(!ownerid){
            return res.status(400).json({Error:"You are not Logged in. Login first"});
        }
        const question= await Question.find({owner:ownerid});
    
        return res.status(200).json({question});
    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }

}

export const getquestion = async (req, res) => {
    try{
        const type=req.query.data
        const cat=req.query.category;
        

        var question;
        if(cat){
            const catArray=cat.split('+');
            console.log(catArray)
            question = await Question.find({category: {$in : catArray}});
        }
        question = await Question.find();
    
        if(type=="less"){
            const countedresult = Promise.all(question.map(async(element)=>{
                const answers = await Answer({ parent_post: element._id });
                return { question, answerCount: answers.length };
            }));
            (await countedresult).sort((a, b)=> b.answerCount-a.answerCount);
            
            question= (await countedresult).map((element)=> element.question);

            console.log("in get question", question);
        }
        return res.status(200).json({question});
    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }

}

export const deleteQuestion = async(req, res) => {
    try{
        const quesid=req.params.id;

        const question = await Question.findById(quesid);
    
        if(!question){
            return res.status(404).json({ error: "question not found" });
        }
        if(!question.owner==req.user.id){
            return res.status(404).json({ error: "Wrong Author" });
        }
    
        await Question.deleteOne({_id:quesid});
    
        return res.status(200).json({message:"Question deleted"});        
    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }
    
}

export const updatequestion = async(req, res) => {
    try{
        const quesid=req.params.id;
        const {newtittle, newdesc} = req.body
        const question = await Question.findById(quesid);
        
       

        if(!question){
            return res.status(404).json({ error: "question not found" });
        }

        if(!question.owner==req.user.id){
            return res.status(404).json({ error: "Wrong Author" });
        }

        if(newtittle){
            question.Tittle=newtittle;
        }
        if(newdesc){
            question.description=newdesc;
        }
        
    
        await question.save();
    
        return res.status(200).json({message:"Question updated"});  
    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }
    
}