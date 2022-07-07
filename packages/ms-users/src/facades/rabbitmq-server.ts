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
      noAck: false
    });
  }

  public close() {
    this.channel && this.channel.close();
    this.server && this.server.close();
  }

  private async handleMessage({ message }: any) {
    if (!message) {
      return;
    }

    const messageObj = JSON.parse(message.toString());
    const pattern = messageObj.pattern;

    const handler = this.messageHandlers.get(pattern);

    if (!handler) {
      console.log('Handler not found!');
      return;
    }

    try {
      const response$ = this.transformToObservable(await handler(messageObj)) as Observable<any>;
      await response$.toPromise();

      return true;
    } catch (err) {
      console.log(err);
    }
  }

  private async init() {
    this.server = await amqp.connect(this.host);
    this.channel = await this.server.createChannel();
    this.channel.assertQueue(this.queue, { durable: false });
    this.channel.assertExchange('users_exchange', 'direct');
  }
}
