import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";

dotenv.config();

export async function azureBlobStorageDelete(filePath: string) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING || ""
  );
  const containerClient = blobServiceClient.getContainerClient(
    process.env.AZURE_BLOB_STORAGE_CONTAINER_NAME || ""
  );
  const blockBlobClient = containerClient.getBlockBlobClient(filePath);

  const response = await blockBlobClient.deleteIfExists();

  return response.succeeded;
}
