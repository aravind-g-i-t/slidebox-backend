export interface ITransactionManager {
    runInTransaction<T>(work: (session: any) => Promise<T>): Promise<T>;
}