const { Kafka } = require('kafkajs');


createProducer();

async function createProducer() {
    try {

        const kafka = new Kafka({
            clientId: "kafka_ornek_1",
            brokers: ["192.168.1.102:9092"]
        });
        const consumer = kafka.consumer({
            groupId: "ornek_1_cg",

        });
        console.log("Consumer'a Bağlanılıyor...");
        await consumer.connect();
        console.log("Bağlantı Başarılı...");

        await consumer.subscribe({
            topic: "Logs",
            fromBeginning: true
        });
        await consumer.run({
            eachMessage: async result  => {
                console.log(`Gelen mesaj ${result.message.value} : Partition : => ${result.partition}`)
            }
        })

    } catch (error) {

        console.log("bir hata oluştu", error);
    }

}

