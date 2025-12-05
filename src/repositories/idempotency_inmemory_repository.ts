import { IdempotencyRepository} from "@api/index";
import { Injectable } from "@nestjs/common";
@Injectable()
export class IdempotencyInMemoryRepository implements IdempotencyRepository{
    private data:Record<string,any> = {};
    public async preSave(idempotencyKey: string): Promise<void> {
       this.data[idempotencyKey] = {};
    }
    public async update(idempotencyKey: string, response: any): Promise<void> {
        this.data[idempotencyKey] = response;
    }

    public async  find(idempotencyKey: string): Promise<{ response: any } | null>{
            return this.data?.[idempotencyKey];
    }    
}