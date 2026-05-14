import type { User } from "../../../../domain/entities/User.js";
import type { CreateUserInput, IUserRepository } from "../../../../domain/interfaces/IUserRepository.js";
import { UserModel, type UserDoc } from "../models/UserModel.js";


export class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const doc= await UserModel.findOne({ email });
        return doc? this._toEntity(doc):null
    }

    async findById(id: string): Promise<User | null> {
        const doc= await UserModel.findById(id);
        return doc? this._toEntity(doc):null
    }

    async create(user: CreateUserInput): Promise<User> {
        const doc = await UserModel.create(user);
        return this._toEntity(doc)
    }

    private _toEntity(doc:UserDoc):User{
        return {
            id: doc._id.toString(),
            name: doc.name,
            email: doc.email,
            phone: doc.phone,
            password: doc.password,
            createdAt: doc.createdAt
        }
    }

}