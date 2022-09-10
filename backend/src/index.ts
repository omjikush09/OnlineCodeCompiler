import { json, Request,Response } from "express";
import express from "express";
import path from "path";
const app=express();
import generatefile from "./getSourceCode"
import {executeCppCode,executePyCode} from "./executeCode"
import cors from "cors";
import { run } from "./kafka/topic";
import { sendMessage } from "./kafka/producer";
import { getCodeFromKafka } from "./kafka/consumer";
run();



const dirCode=path.join(__dirname,".");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/code",async (req:Request,res:Response)=>{

    // let ee={dfd:"fd"};
    const code:string=req.body.code;
    const id=req.body.id || 34;
    // console.log(req.body)
    if(code==undefined ||code.length==0){
        // console.log("he")
        return res.status(400).json({error:"NO Code Found"});
    }
    let language:string;
    if(req.query.language){
        if(typeof req.query.language=="string"){
            // console.log(typeof req.query.language)
            language=req.query.language;
            if(language=="cpp"){
                try {
                    const filepath:string=await generatefile(language,code);
                    console.log(filepath,"fdfdfdf");
                    const msg=JSON.stringify({id,language,code,filepath});
                    sendMessage(msg);
                // const output=await executeCppCode(filepath);
                return res.json("Submitted Successfully......Wait for execution")
                } catch (error) {
                    res.status(400).json(error);
                }
    

            }else if(language=="py"){

                
                try {
                    const filepath=await generatefile(language,code);
                    console.log(filepath,"fdfdfdf");
                    
                    const output=await executePyCode(filepath);
                    return res.json({output})
                } catch (error) {
                    return res.status(400).json(error);
                }
                
            }
            
           

        }

    }else{
        return res.status(400).json({error:"Please specifiy Language"})
    }
    



    // return res.json({ee:"efef"})
})

getCodeFromKafka();
const port=process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})









