export interface CrudInterface<T,K = any>{
    create(data: K): Promise<T>;
    findAll(): Promise<T[]>;
    findById(id:number): Promise<T | null>;
    update(id:number, data: Partial<T>): Promise<T | null>;
    delete(id: number): Promise<boolean>;
}