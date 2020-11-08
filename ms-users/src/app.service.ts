import { Injectable } from '@nestjs/common';
import axios from 'axios';

// import { setData } from './facades/elastic';
import { IGithubReturn } from './interfaces/IGithub';

interface IPayload {
  name: string;
}

@Injectable()
export class AppService {
  public async getEvent(data: IPayload) {
    console.log('**** data received ****', data);

    try {
      const response = await axios.get<IGithubReturn>(`https://api.github.com/users/${data.name}`);

      console.log(`***** user find: ${response.data.login} *****`);
      console.log(`***** user find: ${response.data.repos_url} *****`);
      // await setData(response.data);
    } catch (err) {
      console.log(err.data.message);
      console.log('***** user not find *****');
    }

    return 'User created';
  }
}
