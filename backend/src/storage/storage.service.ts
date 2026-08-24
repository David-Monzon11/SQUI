import path from "path";
import fs from "fs";
import { config } from "../config/env.js";

export interface IStorageService {
  uploadFile(fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string>;
  deleteFile(fileUrl: string): Promise<void>;
}

export class LocalStorageService implements IStorageService {
  private uploadDir: string;

  constructor() {
    this.uploadDir = path.resolve(process.cwd(), config.storageLocalPath);
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> {
    const filePath = path.join(this.uploadDir, fileName);
    await fs.promises.writeFile(filePath, fileBuffer);
    return `/uploads/${fileName}`;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const fileName = path.basename(fileUrl);
    const filePath = path.join(this.uploadDir, fileName);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  }
}

export const storageService = new LocalStorageService();
