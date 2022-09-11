import {exec} from "child_process"
import fs from "fs";
import path from "path";
const dirCode=path.join(__dirname,"codes");
const outputPath=path.join(__dirname,"outputs")
 import { ENVIRONMENT } from "./config.keys";

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive:true});
}
console.log(ENVIRONMENT)
const dirStr=ENVIRONMENT=="production"?"./dist/codes":"./src/codes"


const executePyCode=(filepath:string)=>{

    const id=path.basename(filepath).split(".")[0];

    return new Promise((resolve,reject)=>{
        exec(` docker run  --rm -v "${dirCode}:/usr/src/myapp -w /usr/src/myapp" python:latest python ${id}.py`,(error,stdout,stderr)=>{
            console.log(error)
            error && reject({ error, stderr });
            stderr && reject(stderr);
            console.log(id,"id")
            // resolve(stdout);
            exec(`cd ${dirStr} && ./${id}`,(error,stdout,stderr)=>{
                console.log(error)
                error && reject({ error, stderr });
                stderr && reject(stderr);
                
                resolve(stdout);
            })
        });
        
        
    })
}


const executeCppCode=(filepath:string)=>{
    
    // const execute=()
    
    const id=path.basename(filepath).split(".")[0];
// const outpath=path.join(outputPath,`${id}.out`)

return new Promise((resolve,reject)=>{
    exec(`docker run --rm -v "${dirCode}":/usr/src/myapp -w /usr/src/myapp gcc:latest g++ -o ${id} ${id}.cpp`,(error,stdout,stderr)=>{
        console.log(error)
        if(error){ 
                let e=error.toString();
            generateOutputTxt(id,e);
            return reject({ error, stderr })};
        stderr && reject(stderr);
        console.log(id,"id")
        console.log(dirStr)
            // resolve(stdout);
             exec(`cd ${dirStr} && ./${id}`,(error,stdout,stderr)=>{
            console.log(error)

            error && reject({ error, stderr });
            stderr && reject(stderr);
            generateOutputTxt(id,stdout);
            resolve(stdout);
        })
        })
        //`./${id}`
        // console.log(`cd ./src/codes/ && ./${id}`);
        
       
    })
    

}

const generateOutputTxt=async (id:string,code:string)=>{
    
    const filename=`${id}.txt`
    const filepath=path.join(outputPath,filename);
    
     fs.writeFile(filepath,code,(err)=>{
        if(err){
            return Promise.reject(err);
        }
        
    });
    return  filepath;
    // console.log(filepath)


}

// const  getSolutionCpp=(req:Request,res:Response, id:string)=>{
//     return (
    
//          exec(`cd ${dirStr} && ./${id}`,(error,stdout,stderr)=>{
//             console.log(error)
//             if(error) return res.status(400).json({ error, stderr });
//             stderr && reject(stderr);
            
//             resolve(stdout);
//         })
    
//     )
// }

// const sendError=(res:Response,error:string)=>{
//     return res.status
// }



export {executeCppCode,executePyCode};