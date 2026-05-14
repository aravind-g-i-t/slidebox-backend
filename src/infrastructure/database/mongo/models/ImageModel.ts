import mongoose, { Document, Schema, Types } from "mongoose";

export interface ImageDoc extends Document{
    _id: Types.ObjectId;
    userId:Types.ObjectId;
    title:string;
    imageUrl:string;
    publicId:string;
    order:number;
    createdAt:Date;
    updatedAt:Date;
}



const imageSchema = new Schema<ImageDoc>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },

        imageUrl: {
            type: String,
            required: true,
        },

        publicId: {
            type: String,
            required: true,
        },
        order: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const ImageModel = mongoose.model<ImageDoc>("Image", imageSchema);