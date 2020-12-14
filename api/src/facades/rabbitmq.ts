import * as amqp from 'amqplib';

export class RabbitMQClient {
  constructor(private readonly host: string, private readonly queue: string) {}

  public async sendSingleMessage(messageObj: any) {
    const server = await amqp.connect(this.host);
    const channel = await server.createChannel();

    channel.assertQueue(this.queue, { durable: false });
    channel.assertExchange('users_exchange', 'direct');

    channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(messageObj)));
  }
}
