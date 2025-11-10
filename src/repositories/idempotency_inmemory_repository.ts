import { IdempotencyRepository} from "@api/index";
export class IdempotencyInmemoryRepository implements IdempotencyRepository{
    preSave(idempotencyKey: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(idempotencyKey: string, response: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public  find(idempotencyKey: string): Promise<{ response: string } | null>{
     return Promise.resolve({ response: "ok" });

    }    
}