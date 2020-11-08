import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('user_created')
  async getEvent(@Payload() data: { name: string }, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    await this.appService.getEvent(data);

    channel.ack(originalMsg);
  }
}
