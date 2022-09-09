import { Request,Response } from "express";
import express from "express";
import path from "path";
const app=express();
import generatefile from "./getSourceCode"
import {executeCppCode,executePyCode} from "./executeCode"
import cors from "cors";




const dirCode=path.join(__dirname,".");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/code",async (req:Request,res:Response)=>{

    // let ee={dfd:"fd"};
    const code:string=req.body.code;
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
                    const filepath=await generatefile(language,code);
                    console.log(filepath,"fdfdfdf");
                    
                const output=await executeCppCode(filepath);
                return res.json({output})
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


const port=process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})









