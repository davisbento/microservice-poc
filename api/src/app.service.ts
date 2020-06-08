import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Logger } from 'winston';

@Injectable()
export class AppService {
  constructor(
    @Inject('EVENT_SERVICE') private readonly clientProxy: ClientProxy,
    @Inject('winston') private readonly logger: Logger
  ) {}

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  async onModuleInit() {
    await this.clientProxy.connect();
  }

  public publish(name: string) {
    this.logger.log('info', 'Publicando evento...');
    this.clientProxy.emit('user_created', { name }).toPromise();
    return 'Message sent';
  }
}
