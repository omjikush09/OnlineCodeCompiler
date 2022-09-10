import { Kafka } from "kafkajs";

// const msg = process.argv[2];


export const sendMessage =async (msg:string)=>{
    try {
        const kafka= new Kafka({
            "clientId":"myapp",
            "brokers":["localhost:9092"]
        })
        const producer=kafka.producer();
        await producer.connect();
        // await admin.createTopics({
        //     "topics":[{
        //         "topic":"Users",
        //         "numPartitions":2
        //     }]
        // })
        const partition=msg[0]<"N"? 0:1;
        const result=await producer.send({
            "topic":"Users",
            "messages":[
                {
                    "value":JSON.stringify(msg),
                    "partition":partition
                }
            ]
        })
        console.log(result);
        console.log("connected succefully")
        await producer.disconnect();
    } catch (error) {
        console.log(`Error ${error}`)
    }
}

// run();


