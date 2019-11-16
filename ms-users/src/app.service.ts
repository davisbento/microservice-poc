import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface IPayload {
  name: string;
}

@Injectable()
export class AppService {
  async getEvent(data: IPayload) {
    console.log('**** data received ****', data);

    try {
      const response = await axios.get(
        `https://api.github.com/users/${data.name}`,
      );

      console.log(`***** user find: ${response.data.login} *****`);
      console.log(JSON.stringify(response.data));
    } catch (err) {
      console.log(err.data.message);
      console.log(`***** user not find *****`);
    }

    return 'User created';
  }
}
