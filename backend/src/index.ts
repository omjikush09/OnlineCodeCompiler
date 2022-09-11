import { json, Request,Response } from "express";
import express from "express";
import fs from "fs"
import path from "path";
const app=express();
import {exec} from "child_process"
import generatefile from "./getSourceCode"
import {executeCppCode,executePyCode} from "./executeCode"
import cors from "cors";
import { run } from "./kafka/topic";
import { sendMessage } from "./kafka/producer";
import { getCodeFromKafka } from "./kafka/consumer";
import { ENVIRONMENT } from "./config.keys";
const outputPath=path.join(__dirname,"outputs")
run();


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
            language=req.query.language
            
            if(language=="cpp"){
                try {
                    const filepath:string=await generatefile(language,id,code);
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
                    const filepath=await generatefile(language,id,code);
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



app.get("/getsolution",async (req:Request,res:Response)=>{
    


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

    // exec(`cd ${dirStr} && ./${id}`,(error,stdout,stderr)=>{
    //     console.log(error)
    //     if(error)  return res.status(400).json({ error, stderr });
    //     if(stderr) return  res.status(400).json(stderr);
        
    //     return res.json({output:stdout});
    // })

})


getCodeFromKafka();
const port=process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})



















