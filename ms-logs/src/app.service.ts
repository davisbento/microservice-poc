import { Injectable } from '@nestjs/common';

import { setData, setDataLog } from './utils/elastic';

export interface IPayload {
  login: string;
  url: string;
}

@Injectable()
export class AppService {
  public async userCreatedEvent(data: IPayload) {
    console.log('**** data received ****', data);

    try {
      await setData(data.login, data.url);
    } catch (err) {
      console.log(err);
      console.log('***** user not found *****');
      await setDataLog({
        log: `User ${data.login} not found`,
      });
    }

    return 'User created';
  }
}
