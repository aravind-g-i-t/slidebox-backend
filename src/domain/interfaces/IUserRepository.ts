import type { User } from "../entities/User";

export interface CreateUserInput {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface IUserRepository {
    findByEmail(email: string, session?: any): Promise<User | null>;
    findById(id: string, session?: any): Promise<User | null>;
    create(user: CreateUserInput, session?: any): Promise<User>;
    findOneAndUpdate(filter: Partial<User>, updateData: Partial<CreateUserInput>, session?: any): Promise<User | null>;
}