export interface FileService {
  uploadAvatar: (file: Express.Multer.File) => Promise<string>;
  uploadAttachments: (files: Express.Multer.File[]) => Promise<string[]>;
  deleteFile: (filePath: string) => Promise<void>;
}
