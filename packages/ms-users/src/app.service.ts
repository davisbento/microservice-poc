import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { setData, setDataLog } from './utils/elastic';
import { IGithubReturn } from './interfaces/IGithub';

interface IPayload {
  name: string;
}

@Injectable()
export class AppService {
  public async getEvent(data: IPayload) {
    console.log('**** data received ****', data);

    try {
      const response = await axios.get<IGithubReturn>(
        `https://api.github.com/users/${data.name}`
      );

      console.log(`***** user find: ${response.data.login} *****`);
      console.log(`***** user find: ${response.data.repos_url} *****`);
      await setData(response.data);
    } catch (err) {
      console.log(err);
      console.log('***** user not found *****');
      await setDataLog({
        log: `User ${data.name} not found`,
      });
    }

    return 'User created';
  }
}
