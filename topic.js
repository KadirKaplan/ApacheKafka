const { Kafka } = require('kafkajs');


createTopic();

async function createTopic() {
    try {
        const kafka = new Kafka({
            clientId: "kafka_ornek_1",
            brokers: ["192.168.1.102:9092"]
        });
        const admin = kafka.admin();
        
        console.log("kafka Broker'a bağlanılıyor...");

        await admin.connect();

        console.log("kafka Broker'a bağlanıldı...");

        await admin.createTopics({
            topics: [
                {
                    topic: "Logs",
                    numPartitions: 1
                },
                {
                    topic: "Logs2",
                    numPartitions: 2
                }
            ]
        });
        console.log("Topic oluşturuldu...");
        await admin.disconnect();


    } catch (error) {

        console.log("bir hata oluştu", error);
    } finally {
        process.exit(0);
    }

}

