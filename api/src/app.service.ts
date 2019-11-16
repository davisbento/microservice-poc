import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('EVENT_SERVICE') private readonly clientProxy: ClientProxy,
  ) {}

  async onModuleInit() {
    await this.clientProxy.connect();
  }

  publish(name: string) {
    this.clientProxy.emit('user_created', { name }).toPromise();
    return 'Message sent';
  }
}
