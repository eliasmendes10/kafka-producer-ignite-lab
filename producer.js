import { Kafka } from 'kafkajs'
import { randomUUID } from 'node:crypto'

async function bootstrap() {
    const kafka = new Kafka({
        brokers: ['leading-sparrow-7335-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username: 'bGVhZGluZy1zcGFycm93LTczMzUkT69L9fkuTB3KOYnQlmAachcyfcah5mdeqP4',
          password: 'QixhviyeVpY91VdYlwhHAc9Dsz4hTbj1gaG0Swm6TEbW6-VxyZFKO343UXwnUtsJJE73hA==',
        },
        ssl: true,
      })

      const producer = kafka.producer()

      await producer.connect()
      await producer.send({ 
        topic: 'notifications.send-notification',
        messages: [{
            value: JSON.stringify({
                content: 'Nova Notificação',
                category: 'Social',
                recipientId: randomUUID()
            })
        }]
      })

      producer.disconnect()
}

bootstrap()