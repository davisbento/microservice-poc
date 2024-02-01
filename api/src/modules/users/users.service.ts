import { Injectable } from '@nestjs/common';

import { ApiService } from 'modules/api/api.service';
import { RabbitMQService } from 'modules/rabbitmq/rabbitmq.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly apiService: ApiService,
    private readonly client: RabbitMQService
  ) {}

  public async getUserByUsername(name: string) {
    const userData = await this.apiService.getUser(name);

    await this.client.publishUserCreated({
      login: userData.login,
      url: userData.url,
    });

    return 'Message sent';
  }
}
