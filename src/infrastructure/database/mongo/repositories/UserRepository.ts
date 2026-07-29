import type { User } from "../../../../domain/entities/User";
import type { CreateUserInput, IUserRepository } from "../../../../application/interfaces/services/IUserRepository";
import { UserModel, type UserDoc } from "../models/UserModel";

export class UserRepository implements IUserRepository {
    async findByEmail(email: string, session?: any): Promise<User | null> {
        const doc = await UserModel.findOne({ email }, null, { session });
        return doc ? this._toEntity(doc) : null;
    }

    async findById(id: string, session?: any): Promise<User | null> {
        const doc = await UserModel.findById(id, null, { session });
        return doc ? this._toEntity(doc) : null;
    }

    async create(user: CreateUserInput, session?: any): Promise<User> {
        const doc = new UserModel(user);
        await doc.save({ session });
        return this._toEntity(doc);
    }

    async findOneAndUpdate(filter: Partial<User>, updateData: Partial<CreateUserInput>, session?: any): Promise<User | null> {
        const doc = await UserModel.findOneAndUpdate(filter, updateData, { returnDocument: "after", session });
        return doc ? this._toEntity(doc) : null;
    }

    private _toEntity(doc: UserDoc): User {
        return {
            id: doc._id.toString(),
            name: doc.name,
            email: doc.email,
            phone: doc.phone,
            password: doc.password,
            createdAt: doc.createdAt
        };
    }
}