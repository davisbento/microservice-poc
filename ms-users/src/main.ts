import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'events_queue',
      noAck: false,
      queueOptions: { durable: true }
    }
  });
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
