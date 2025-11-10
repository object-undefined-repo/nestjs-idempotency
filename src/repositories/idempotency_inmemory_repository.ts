import { IdempotencyRepository} from "@api/index";
export class IdempotencyInmemoryRepository implements IdempotencyRepository{
    public async preSave(idempotencyKey: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public async update(idempotencyKey: string, response: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async  find(idempotencyKey: string): Promise<{ response: string } | null>{
     return { response: "ok" };
    }    
}