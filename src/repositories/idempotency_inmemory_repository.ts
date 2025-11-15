import { IdempotencyRepository} from "@api/index";
import { Injectable } from "@nestjs/common";
@Injectable()
export class IdempotencyInmemoryRepository implements IdempotencyRepository{
    public async preSave(idempotencyId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public async update(idempotencyId: string, response: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async  find(idempotencyId: string): Promise<{ response: string } | null>{
     return { response: "ok" };
    }    
}