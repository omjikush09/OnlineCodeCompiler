import { Kafka } from "kafkajs";



export const run =async ()=>{
    try {
        const kafka= new Kafka({
            "clientId":"myapp",
            "brokers":["localhost:9092"]
        })
        const admin=kafka.admin();
        await admin.connect();
        await admin.createTopics({
            "topics":[{
                "topic":"Users",
                "numPartitions":2
            }]
        })
        console.log("connected succefully")
        await admin.disconnect();
    } catch (error) {
        
    }
}

