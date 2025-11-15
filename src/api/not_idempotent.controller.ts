import { Controller, Post, Body } from '@nestjs/common';

@Controller('not-idempotent')
export class NotIdempotentController {
  @Post()
  create(@Body() body: any) {
    // Example logic for non-idempotent POST
    return { message: 'Non-idempotent POST received', data: body };
  }
}
