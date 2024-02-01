import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('')
  public index() {
    return 'Hello World!';
  }
}
