import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { RabbitMQServer } from './facades/rabbitmq-server';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    strategy: new RabbitMQServer('amqp://rabbitmq:5672', 'users_queue')
  });

  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
