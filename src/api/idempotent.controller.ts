import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { IdempotencyInterceptor } from '../interceptors/idempotency__interceptor';

@Controller('idempotent')
@UseInterceptors(IdempotencyInterceptor)
export class IdempotentController {
  @Post()
  create(@Body() body: any) {
    // Example logic for idempotent POST
    return { message: 'Idempotent POST received', data: body };
  }
}
