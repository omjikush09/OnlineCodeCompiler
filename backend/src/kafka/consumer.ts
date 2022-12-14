import { Kafka } from "kafkajs";
import { executeCppCode } from "../executeCode";


export const getCodeFromKafka =async ()=>{
    try {
        const kafka= new Kafka({
            "clientId":"myapp",
            "brokers":["localhost:9092"]
        })
        const consumer=kafka.consumer({"groupId":"test"});
        await consumer.connect();
        
        consumer.subscribe({
            "topic":"Users",
            "fromBeginning":true
        })
        
        await consumer.run({
            "eachMessage": async result=>{
                const value=result.message.value?.toString()!;
                const msg=JSON.parse(value)
                executeCppCode(msg)
            }
        })
     
        console.log("connected succefully")
        // await consumer.disconnect();
    } catch (error) {
        console.log(`Error ${error}`)
    }
}

