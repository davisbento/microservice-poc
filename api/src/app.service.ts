import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';

import { RabbitMQClient } from './facades/rabbitmq';

@Injectable()
export class AppService {
  client = new RabbitMQClient('amqp://rabbitmq:5672', 'users_queue');

  constructor(@Inject('winston') private readonly logger: Logger) {}

  public publish(name: string) {
    this.logger.log('info', 'Publicando evento...');
    this.client.sendSingleMessage({ data: { name }, pattern: 'user_created' });
    return 'Message sent';
  }
}
