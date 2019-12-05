import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EVENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://rabbitmq:5672`],
          queue: 'events_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
