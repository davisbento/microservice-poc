import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://rabbitmq:5672`],
      queue: 'events_queue',
      queueOptions: { durable: true },
    },
  });
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
