import fs from "fs";
import path from "path";
import {v4} from "uuid"
const dirCode=path.join(__dirname,"codes");


const generatefile=async (format:string,id:Number,code:string)=>{
    
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


if(!fs.existsSync(dirCode)){
    fs.mkdirSync(dirCode,{recursive:true});
}


export default generatefile;