import { IdempotencyRepository} from "@api/index";
import { Injectable } from "@nestjs/common";
@Injectable()
export class IdempotencyInmemoryRepository implements IdempotencyRepository{
    private data:Record<string,any> = {};
    public async preSave(idempotencyId: string): Promise<void> {
       this.data[idempotencyId] = {};
    }
    public async update(idempotencyId: string, response: any): Promise<void> {
        this.data[idempotencyId] = response;
    }

    public async  find(idempotencyId: string): Promise<{ response: string } | null>{
        if(this.data[idempotencyId])
            return { response: "ok" };
        else
            return null;
    }    
}