import axios from "axios"
import { chownSync } from "fs";
import qs from "qs";
import { SERVER_URL } from "../../config.keys";
const instance=axios.create({
    baseURL:SERVER_URL
})

export const sendCode= async ({language="cpp",code="",id=""})=>{
    const url=`/code?language=${language}`
   
    return instance.post(url,{code,id}).then(res=>{
        // console.log(res.data)
        return res.data;
    }).catch(res=> {
        // console.log(res)
        return Promise.reject(res.response)})


}

export const getSolution= async ({language="cpp",id=""})=>{
    const url=`/getSolution?language=${language}&id=${id}`

    return instance.get(url).then(res=>{
        return res.data;
    }).catch(res=>{
        return Promise.reject(res.response);
    })


}








