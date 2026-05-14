import type { Image } from "../entities/Image.js";

export interface CreateImageInput {
  userId: string;
  title: string;
  imageUrl: string;
  publicId: string;
  order: number;
}


export interface IImageRepository {
  createMany(images: CreateImageInput[]): Promise<Image[]>;

  reArrangeDownwards (fromOrder:number, toOrder:number, userId:string):Promise<void>

  reArrangeDownwardss (fromOrder:number, toOrder:number, userId:string):Promise<void>

  updateById(id:string, updateData:Partial<Image>):Promise<Image | null>

  findById(id: string): Promise<Image | null>

  findByUserId(input: {
    userId: string,
    skip: number,
    limit: number
  }
  ): Promise<{images:Image[]; totalCount:number}>

  getLastOrder(userId: string): Promise<number>;

  deleteById(id:string):Promise<void>

  shiftOrdersDownFrom(fromOrder: number, userId: string): Promise<void>
}