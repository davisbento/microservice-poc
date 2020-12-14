import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import * as amqp from 'amqplib';
import { Observable } from 'rxjs';

export class RabbitMQServer extends Server implements CustomTransportStrategy {
  private server: amqp.Connection = null;
  private channel: amqp.Channel = null;

  constructor(private readonly host: string, private readonly queue: string) {
    super();
  }

  public async listen() {
    await this.init();
    this.channel.consume(this.queue, this.handleMessage.bind(this), {
      noAck: true
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
    // this.channel.ack(message);
    const handler = this.messageHandlers.get(pattern);
    const response$ = this.transformToObservable(await handler(messageObj.data)) as Observable<any>;
    response$ &&
      this.send(response$, data => {
        this.sendMessage(data);
      });
  }

  private sendMessage(message: any) {
    const buffer = Buffer.from(JSON.stringify(message));
    this.channel.sendToQueue(this.queue, buffer);
  }

  private async init() {
    this.server = await amqp.connect(this.host);
    this.channel = await this.server.createChannel();
    this.channel.assertQueue(this.queue, { durable: false });
    this.channel.assertExchange('users_exchange', 'direct');
  }
}
