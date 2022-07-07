import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('user_created')
  async getEvent(@Payload() data: { name: string }) {
    console.log('caiu aqui', data);
    await this.appService.getEvent(data);
  }
}
