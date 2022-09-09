import fs from "fs";
import path from "path";
import {v4} from "uuid"
const dirCode=path.join(__dirname,"codes");


const generatefile=async (format:string,code:string)=>{
    const id=v4();
    const filename=`${id}.${format}`
    const filepath=path.join(dirCode,filename);
    await fs.writeFileSync(filepath,code);
    // console.log(filepath)
    return  filepath;


}


if(!fs.existsSync(dirCode)){
    fs.mkdirSync(dirCode,{recursive:true});
}


export default generatefile;