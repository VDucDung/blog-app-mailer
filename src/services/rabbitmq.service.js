const amqp = require('amqplib')

const { rabbitmq } = require('../config')

class RabbitMQService {
  channel

  async createChannel() {
    const connection = await amqp.connect(rabbitmq.uri)
    this.channel = await connection.createChannel()
  }

  async resovleQueue(queueName, func) {
    if (!this.channel) {
      await this.createChannel()
    }

    await this.channel.assertQueue(queueName, { durable: true })

    this.channel.consume(
      queueName,
      async (message) => {
        const data = JSON.parse(message.content.toString())

        await func({ ...data, queueName })

        this.channel.ack(message)
      },
      { noAck: false }
    )
  }
}

module.exports = new RabbitMQService()
