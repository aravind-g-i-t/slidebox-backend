export interface UploadImageResult {
  secure_url: string;
  public_id: string;
}

export interface IFileStorageService {
  uploadImage(
    filePath: string
  ): Promise<UploadImageResult>;

  deleteImage(publicId: string): Promise<void>;
}