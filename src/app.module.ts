
import { Module } from '@nestjs/common';
import { IdempotentController, NotIdempotentController } from './api';
import { IdempotencyInmemoryRepository } from './repositories';

@Module({
  imports: [],
  controllers: [IdempotentController, NotIdempotentController],
  providers: [IdempotencyInmemoryRepository],
})
export class AppModule {}