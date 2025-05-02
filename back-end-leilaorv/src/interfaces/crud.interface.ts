export interface CRUDRepository<T> {
    create(item: T): Promise<T>;
    findByid(id: number): Promise<T | null>;
    update(id: number, item: T): Promise<T | null>;
    delete(id: number): Promise<boolean>;
    list(): Promise<T[]>;
  }