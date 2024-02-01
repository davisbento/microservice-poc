import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { HttpModule } from 'modules/http/http.module';

@Module({
  imports: [HttpModule],
  providers: [ApiService],
  exports: [ApiService],
})
export class ApiModule {}
