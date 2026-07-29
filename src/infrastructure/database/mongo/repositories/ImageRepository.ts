import type { Image } from "../../../../domain/entities/Image";
import type { CreateImageInput, IImageRepository } from "../../../../application/interfaces/repositories/IImageRepository";
import { ImageModel, type ImageDoc } from "../models/ImageModel";

export class ImageRepository implements IImageRepository {
    async createMany(
        images: CreateImageInput[],
        session?: any
    ): Promise<Image[]> {
        const docs = await ImageModel.insertMany(images, { session });
        return docs.map(doc => {
            return {
                id: doc._id.toString(),
                userId: doc.userId.toString(),
                title: doc.title,
                imageUrl: doc.imageUrl,
                publicId: doc.publicId,
                order: doc.order,
                createdAt: doc.createdAt,
                updatedAt: doc.updatedAt
            }
        });
    }

    async findByUserId(
        input: {
            userId: string;
            skip: number;
            limit: number;
        },
        session?: any
    ): Promise<{ images: Image[]; totalCount: number }> {
        const { userId, skip, limit } = input;

        const [docs, totalCount] = await Promise.all([
            ImageModel.find({ userId })
                .sort({ order: -1 })
                .skip(skip)
                .limit(limit)
                .session(session)
                .exec(),
            ImageModel.countDocuments({ userId }).session(session)
        ]);

        const images = docs.map(doc => this._toEntity(doc));
        return {
            images,
            totalCount
        };
    }

    async findById(id: string, session?: any): Promise<Image | null> {
        const doc = await ImageModel.findById(id, null, { session });
        return doc ? this._toEntity(doc) : null;
    }

    async getLastOrder(
        userId: string,
        session?: any
    ): Promise<number> {
        const lastImage = await ImageModel
            .findOne({ userId }, null, { session })
            .sort({ order: -1 });

        return lastImage ? lastImage.order : -1;
    }

    async reArrangeDownwardss(fromOrder: number, toOrder: number, userId: string, session?: any): Promise<void> {
        await ImageModel.updateMany(
            {
                userId,
                order: { $gte: fromOrder, $lte: toOrder }
            },
            { $inc: { order: -1 } },
            { session }
        );
    }

    async reArrangeDownwards(fromOrder: number, toOrder: number, userId: string, session?: any): Promise<void> {
        await ImageModel.updateMany(
            {
                userId,
                order: { $gte: fromOrder, $lte: toOrder }
            },
            { $inc: { order: 1 } },
            { session }
        );
    }

    async updateById(id: string, updateData: Partial<Image>, session?: any): Promise<Image | null> {
        const doc = await ImageModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { returnDocument: "after", session }
        ).lean();
        return doc ? this._toEntity(doc as any) : null;
    }

    async deleteById(id: string, session?: any): Promise<void> {
        await ImageModel.findByIdAndDelete(id, { session });
    }

    async shiftOrdersDownFrom(fromOrder: number, userId: string, session?: any): Promise<void> {
        await ImageModel.updateMany(
            { userId, order: { $gte: fromOrder } },
            { $inc: { order: -1 } },
            { session }
        );
    }

    _toEntity(doc: ImageDoc): Image {
        return {
            id: doc._id.toString(),
            userId: doc.userId.toString(),
            title: doc.title,
            imageUrl: doc.imageUrl,
            publicId: doc.publicId,
            order: doc.order,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        };
    }
}