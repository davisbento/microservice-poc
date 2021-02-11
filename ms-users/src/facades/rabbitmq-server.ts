import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import * as amqp from 'amqplib';

export class RabbitMQServer extends Server implements CustomTransportStrategy {
  private server: amqp.Connection = null;
  private channel: amqp.Channel = null;

  constructor(private readonly host: string, private readonly queue: string) {
    super();
  }

  public async listen() {
    await this.init();
    this.channel.consume(this.queue, this.handleMessage.bind(this), {
      noAck: false
    });
  }

  public close() {
    this.channel && this.channel.close();
    this.server && this.server.close();
  }

  private async handleMessage(message: any) {
    const { content } = message;
    const messageObj = JSON.parse(content.toString());
    const pattern = messageObj.pattern;

    if (!this.messageHandlers.get(pattern)) {
      return;
    }

    const handler = this.messageHandlers.get(pattern);

    try {
      const response$ = await handler(messageObj);
      await response$.toPromise();

      this.channel.ack(message);
    } catch {
      this.channel.nack(message, false, false);
    }
  }

  private async init() {
    this.server = await amqp.connect(this.host);
    this.channel = await this.server.createChannel();
    this.channel.assertQueue(this.queue, { durable: false });
    this.channel.assertExchange('users_exchange', 'direct');
  }
}
