
import { Module } from '@nestjs/common';
import { IdempotentController, NotIdempotentController } from './api';
import { IdempotencyInMemoryRepository } from './repositories';

@Module({
  imports: [],
  controllers: [IdempotentController, NotIdempotentController],
  providers: [IdempotencyInMemoryRepository],
})
export class AppModule {}