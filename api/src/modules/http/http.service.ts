import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class HttpService {
  constructor() {}

  public async get<T = any>(url: string) {
    const response = await axios.get<T>(url);
    return response.data;
  }
}
