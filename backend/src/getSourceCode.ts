import fs from "fs";
import path from "path";
const dirCode=path.join(__dirname,"codes");
import { sendMessage } from "./kafka/producer";
import { executeCppCode } from "./executeCode";

const generatefile=async (format:string,id:string,code:string)=>{
    
    const filename=`${id}.${format}`
    const filepath=path.join(dirCode,filename);
    
     fs.writeFile(filepath,code,(err)=>{
        if(err){
            return Promise.reject(err);
        }
        
    });
    return  filepath;
    // console.log(filepath)


}
interface data{
    id:string,
    language: string,
    code:string
}
export const prepareforSollution=async({language,id,code}:data)=>{
    try {
        const filepath:string=await generatefile(language,id,code);
        const msg=JSON.stringify({id,language,code,filepath});
        // sendMessage(msg);
        console.log(msg)
       const output=await executeCppCode(filepath);
       console.log(output+" output")
    return "Submitted Successfully......Wait for execution"
    } catch (error) {
        throw new Error("Something went wrong"+ JSON.stringify(error)); 
    }
}


if(!fs.existsSync(dirCode)){
    fs.mkdirSync(dirCode,{recursive:true});
}


export default generatefile;