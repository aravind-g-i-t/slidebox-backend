import type { Image } from "../../../domain/entities/Image";

export interface CreateImageInput {
  userId: string;
  title: string;
  imageUrl: string;
  publicId: string;
  order: number;
}

export interface IImageRepository {
  createMany(images: CreateImageInput[], session?: any): Promise<Image[]>;

  reArrangeDownwards(fromOrder: number, toOrder: number, userId: string, session?: any): Promise<void>;

  reArrangeDownwardss(fromOrder: number, toOrder: number, userId: string, session?: any): Promise<void>;

  updateById(id: string, updateData: Partial<Image>, session?: any): Promise<Image | null>;

  findById(id: string, session?: any): Promise<Image | null>;

  findByUserId(
    input: {
      userId: string;
      skip: number;
      limit: number;
    },
    session?: any
  ): Promise<{ images: Image[]; totalCount: number }>;

  getLastOrder(userId: string, session?: any): Promise<number>;

  deleteById(id: string, session?: any): Promise<void>;

  shiftOrdersDownFrom(fromOrder: number, userId: string, session?: any): Promise<void>;
}