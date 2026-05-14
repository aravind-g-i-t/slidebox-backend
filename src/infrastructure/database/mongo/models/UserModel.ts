import mongoose, { Document, mongo, Schema } from "mongoose";

export interface UserDoc extends Document{
    _id: mongoose.Types.ObjectId;
    name:string
    email:string;
    password:string;
    phone:string;
    createdAt:Date;
}



const userSchema = new Schema<UserDoc>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },

        phone: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const UserModel = mongoose.model<UserDoc>("User", userSchema);