import {exec} from "child_process"
import fs from "fs";
import path from "path";
const dirCode=path.join(__dirname,"codes");
const outputPath=path.join(__dirname,"outputs")

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive:true});
}

const executePyCode=(filepath:string)=>{

    const id=path.basename(filepath).split(".")[0];

    return new Promise((resolve,reject)=>{
        exec(` docker run  --rm -v "${dirCode}:/usr/src/myapp -w /usr/src/myapp" python:latest python ${id}.py`,(error,stdout,stderr)=>{
            console.log(error)
            error && reject({ error, stderr });
            stderr && reject(stderr);
            console.log(id,"id")
            // resolve(stdout);
             exec(`cd ./src/codes/ && ./${id}`,(error,stdout,stderr)=>{
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
            if(error) return reject({ error, stderr });
            stderr && reject(stderr);
            console.log(id,"id")
            // resolve(stdout);
             exec(`cd ./src/codes/ && ./${id}`,(error,stdout,stderr)=>{
            console.log(error)
            error && reject({ error, stderr });
            stderr && reject(stderr);
            
            resolve(stdout);
        })
        })
        //`./${id}`
        // console.log(`cd ./src/codes/ && ./${id}`);
        
       
    })
    

}


export {executeCppCode,executePyCode};