import Video from "../models/video.model.js"
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import Answer from '../models/answer.mode.js'

export const uploadvideo = async (req, res) =>{
    try{
        const owner_id=req.user.id;
        const videopath=req.file.filename;
        const { tittle, desc, cat} = req.body;
        console.log("for video upload", tittle, desc, cat, owner_id, videopath);
        const video= new Video({
            owner:owner_id,
            Tittle: tittle,
            description: desc,
            category: cat,
            path:videopath           
        })

        await video.save();

        return res.status(200).json({message:"Video uploaded successfully"});
        
    }catch(error){
        console.log(error);
        return res.status(400).json({error:error.message});
    }
   
}

export const searchResult = async (req, res) => {
    try{
        const query= req.query

        console.log("query", query);

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

export const deleteVideo = async(req, res) => {
    try{
        const videoid=req.params.id;

        const video = await Video.findById(videoid);
    
        if(!video){
            return res.status(404).json({ error: "Video not found" });
        }
        if(!video.owner==req.user.id){
            return res.status(404).json({ error: "Wrong Author" });
        }
    
        await video.deleteOne({_id:videoid});

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const tempDir = path.join(__dirname, '../Storage/uploadVideo');
        const filePath = path.join(tempDir, video.path);
        console.log(filePath);

        fs.unlink(filePath, (err)=>{
            if(err){
                return res.status(400).json({error:err.message});;
            }
        });
    
        return res.status(200).json({message:"Question deleted"});        
    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }
    
}

export const getownVideo = async (req, res) => {
    try{
        const ownerid=req.user.id;
        if(!ownerid){
            return res.status(400).json({Error:"You are not Logged in. Login first"});
        }
        const video= await Video.find({owner:ownerid});
    
        return res.status(200).json({video});
    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }

}

export const getvideo = async (req, res) => {
    try{
        const type=req.query.data
        const cat=req.query.category;
        

        var video;
        if(cat){
            const catArray=cat.split('+');
            console.log(catArray)
            video = await Video.find({category: {$in : catArray}});
        }else{
            video = await Video.find();
        }
        
    
        if(type=="less"){
            const countedresult = Promise.all(Video.map(async(element)=>{
                const answers = await Answer({ parent_post: element._id });
                return { video, answerCount: answers.length };
            }));
            (await countedresult).sort((a, b)=> b.answerCount-a.answerCount);
            
            video= (await countedresult).map((element)=> element.video);

            console.log("in get question", video);
        }
        return res.status(200).json({video});
    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }

}


export const updateVideo = async(req, res) => {
    try{
        const videoid=req.params.id;
        const {newtittle, newdesc} = req.body
        const video = await Video.findById(videoid);
        
       

        if(!video){
            return res.status(404).json({ error: "Video not found" });
        }

        if(!video.owner==req.user.id){
            return res.status(404).json({ error: "Wrong Author" });
        }

        if(newtittle){
            video.Tittle=newtittle;
        }
        if(newdesc){
            video.description=newdesc;
        }
        
    
        await video.save();
    
        return res.status(200).json({message:"Video updated", Video:video});  
    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }
    
}