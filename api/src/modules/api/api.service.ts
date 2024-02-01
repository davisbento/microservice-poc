import { Injectable } from '@nestjs/common';
import { HttpService } from 'modules/http/http.service';

interface IGithubReturn {
  login: string;
  id: number;
  url: string;
  repos_url: string;
}

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  public async getUser(username: string) {
    const userData = await this.httpService.get<IGithubReturn>(
      `https://api.github.com/users/${username}`
    );

    return userData;
  }
}
