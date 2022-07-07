import { Module } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: 'info',
          format: winston.format.combine(winston.format.timestamp(), nestWinstonModuleUtilities.format.nestLike())
        })
      ]
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
