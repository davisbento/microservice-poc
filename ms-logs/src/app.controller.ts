import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AppService, IPayload } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('user_created')
  userCreatedEvent(@Payload() data: IPayload) {
    console.log('User created event', data);

    this.appService.userCreatedEvent({
      login: data.login,
      url: data.url,
    });
  }
}
