import { json, Request,Response } from "express";
import express from "express";
import fs from "fs"
import path from "path";
const app=express();
import {exec} from "child_process"
import generatefile, { prepareforSollution } from "./getSourceCode"

import cors from "cors";
import { run } from "./kafka/topic";
import { sendMessage } from "./kafka/producer";
import { getCodeFromKafka } from "./kafka/consumer";
import { ENVIRONMENT } from "./config.keys";



// run();  // Start Kafka Topic
// getCodeFromKafka();  //Start Kafka Consumer

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/code",async (req:Request,res:Response)=>{

    
    const code:string=req.body.code;
    const id:string=req.body.id;
    
    if(!id){
        res.status(400).json({error:"Id not found"})
    }
    if(code==undefined ||code.length==0){
        return res.status(400).json({error:"NO Code Found"});
    }
    let language:string;
    if(req.query.language){
        if(typeof req.query.language=="string"){
            // console.log(typeof req.query.language)
            language=req.query.language
            
            if(language=="cpp"){
                try {
                    // const filepath:string=await generatefile(language,id,code);
                    // const msg=JSON.stringify({id,language,code,filepath});
                    // sendMessage(msg);
                    const data=prepareforSollution({language,id,code})
                return res.json({success:data})
                } catch (error) {
                    res.status(400).json(error);
                }
                
            }
        }
        
    }else{
        return res.status(400).json({error:"Please specifiy Language"})
    }
})



app.get("/getsolution",async (req:Request,res:Response)=>{
    
    
    
    const outputPath=path.join(__dirname,"outputs")
    // if(fs.existsSync())
    if(req.query.language!=="cpp"){
        return res.status(400).json("Language not supported")
    }
    let id=req.query.id
    // let dirStr=const dirCode=path.join(__dirname,"codes");
    // const dirStr=ENVIRONMENT=="production"?"./dist/codes":"./src/codes"
    const filename=`${id}.txt`
    const filepath=path.join(outputPath,filename);
     fs.readFile(filepath,(err,data)=>{
        if(err){
            return res.status(400).json("file not found check, check your id or wait...")
        }
        return res.json({output:data.toString()});
     })



})


const port=process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})



















