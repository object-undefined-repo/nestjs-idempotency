import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IdempotencyInmemoryRepository } from '../repositories/index';
import { IdempotencyRepository } from '@api/index';

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  constructor(
    @Inject(IdempotencyInmemoryRepository)
    private readonly idempotencyRepository: IdempotencyRepository,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const idempotencyId:string = request.headers['x-idempotency-id'];

    if (!idempotencyId) {
      throw new BadRequestException(
        "Header 'x-idempotency-id' is required for this request.",
      );
    }

    if (!this.isValidUUID(idempotencyId)) {
      throw new BadRequestException(
        "Header 'x-idempotency-id' must be a UUID.",
      );
    }

    const idempotentResponse = await this.idempotencyRepository.find(
      idempotencyId,
    );

    if (idempotentResponse) {
      return of({... idempotentResponse,
        desctiption:'This is stored response of idempotent operation'
      });
    }

    await this.idempotencyRepository.preSave(idempotencyId);

    return next.handle().pipe(
      tap(async (data) => {
        await this.idempotencyRepository.update(idempotencyId, {... data,
          idempotencyId
        });
        return data;
      }),
    );
  }

  private isValidUUID(uuid: string) {
    const uuidRegex =
      /(?:^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}$)|(?:^0{8}-0{4}-0{4}-0{4}-0{12}$)/u;
    return uuidRegex.test(uuid);
  }
}
