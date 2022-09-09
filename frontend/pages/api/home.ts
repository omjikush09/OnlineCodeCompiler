import axios from "axios"
import { chownSync } from "fs";
import qs from "qs";
const instance=axios.create({
    baseURL:"http://localhost:8000/"
})

export const sendCode=({language="cpp",code=""})=>{
    const url=`/code?language=${language}`
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data:{code},
        url,
      };
    return instance.post(url,{code}).then(res=>{
        // console.log(res.data)
        return res.data;
    }).catch(res=> {
        // console.log(res)
        return Promise.reject(res.response)})


}










