import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";
import { ImageFile } from "../domain/types/common/imageFile";

dotenv.config();

export async function azureBlobStorageUpload(
  filePath: string,
  imageFile: ImageFile
) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING || ""
  );
  const containerClient = blobServiceClient.getContainerClient(
    process.env.AZURE_BLOB_STORAGE_CONTAINER_NAME || ""
  );
  const blockBlobClient = containerClient.getBlockBlobClient(filePath);

  await blockBlobClient.upload(imageFile.buffer, imageFile.size);

  return blockBlobClient.url;
}
