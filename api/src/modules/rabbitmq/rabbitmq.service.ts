import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';

import amqp from 'amqp-connection-manager';

@Injectable()
export class RabbitMQService {
  private readonly host = 'amqp://rabbitmq:5672';
  private readonly queue = 'logs_queue';

  constructor(@Inject('winston') private readonly logger: Logger) {}

  public async publishUserCreated(data: any) {
    this.logger.log('info', 'Publicando evento [user_created]');

    await this.sendSingleMessage({
      data,
      pattern: 'user_created',
    });
  }

  private async sendSingleMessage(messageObj: any) {
    const server = await amqp.connect(this.host);
    const channel = await server.createChannel();

    channel.assertQueue(this.queue, { durable: false });

    channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(messageObj)));
  }
}
