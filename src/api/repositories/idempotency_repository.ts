export interface IdempotencyRepository{
    find(idempotencyKey: string): Promise<{ response: any } | null>;    
    preSave(idempotencyKey: string): Promise<void>;
    update(idempotencyKey: string, response: any): Promise<void>;
}