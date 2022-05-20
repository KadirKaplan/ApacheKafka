const { Kafka } = require('kafkajs');


createProducer();

async function createProducer() {
    try {

        const kafka = new Kafka({
            clientId: "kafka_ornek_1",
            brokers: ["192.168.1.102:9092"]
        });
        const producer = kafka.producer();

        console.log("Producer'a bağlanılıyor...");

        await producer.connect();

        console.log("Producer'a bağlanıldı...");

        const message_result = await producer.send({
            topic: "Logs",
            messages: [
                {
                    value: "This is a test message",
                    partition: 0
                }
            ]
        });
        console.log("Gönderim işlemi başarılı", JSON.stringify(message_result));
        await producer.disconnect();
    } catch (error) {

        console.log("bir hata oluştu", error);
    } finally {
        process.exit(0);
    }

}

