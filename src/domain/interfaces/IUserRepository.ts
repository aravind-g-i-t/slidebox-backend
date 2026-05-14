import type { User } from "../entities/User.js";

export interface CreateUserInput{
    name:string;
    email:string;
    phone:string;
    password:string
}

export interface IUserRepository{
    findByEmail(email:string): Promise<User | null>;
    findById(id: string): Promise<User | null>
    create(user:CreateUserInput):Promise<User>
}