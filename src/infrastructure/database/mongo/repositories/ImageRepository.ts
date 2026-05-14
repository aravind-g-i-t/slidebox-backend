import type { Image } from "../../../../domain/entities/Image.js";
import type { CreateImageInput, IImageRepository } from "../../../../domain/interfaces/IImageRepository.js";
import { ImageModel, type ImageDoc } from "../models/ImageModel.js";





export class ImageRepository
    implements IImageRepository {
    async createMany(
        images: CreateImageInput[]
    ): Promise<Image[]> {

        console.log("images", images);

        const docs = await ImageModel.insertMany(images);
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
        })
    }

    async findByUserId(input:
        {
            userId: string,
            skip: number,
            limit: number
        }
    ): Promise<{ images: Image[]; totalCount: number }> {

        const { userId, skip, limit } = input

        const [docs, totalCount] = await Promise.all([
            ImageModel.find({ userId })
                .sort({ order: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            ImageModel.countDocuments({ userId })
        ]);

        const images = docs.map(doc => this._toEntity(doc))
        return {
            images,
            totalCount
        }
    }

    async findById(id: string): Promise<Image | null> {
        const doc = await ImageModel.findById(id);
        return doc ? this._toEntity(doc) : null
    }

    async getLastOrder(
        userId: string
    ): Promise<number> {
        const lastImage = await ImageModel
            .findOne({ userId })
            .sort({ order: -1 });

        return lastImage ? lastImage.order : -1;
    }

    async reArrangeDownwardss(fromOrder: number, toOrder: number, userId: string): Promise<void> {
        await ImageModel.updateMany(
            {
                userId,
                order: { $gte: fromOrder, $lte: toOrder }
            },
            { $inc: { order: -1 } }
        );
    };

    async reArrangeDownwards(fromOrder: number, toOrder: number, userId: string): Promise<void> {
        await ImageModel.updateMany(
            {
                userId,
                order: { $gte: fromOrder, $lte: toOrder }
            },
            { $inc: { order: 1 } }
        );
    };

    async updateById(id: string, updateData: Partial<Image>): Promise<Image | null> {
        const doc = await ImageModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        ).lean();
        return doc ? this._toEntity(doc) : null

    }

    async deleteById(id: string): Promise<void> {
        await ImageModel.findByIdAndDelete(id);
    }

    async shiftOrdersDownFrom(fromOrder: number, userId: string): Promise<void> {
        await ImageModel.updateMany(
            { userId, order: { $gte: fromOrder } },
            { $inc: { order: -1 } }
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
        }
    }



}