import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { UsersModule } from 'modules/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
})
export class AppModule {}
