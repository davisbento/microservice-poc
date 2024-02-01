import { Module } from '@nestjs/common';

import { ApiModule } from 'modules/api/api.module';
import { RabbitMQModule } from 'modules/rabbitmq/rabbitmq.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ApiModule, RabbitMQModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
