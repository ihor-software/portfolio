import { Injectable, Logger } from '@nestjs/common';
import { FileService } from './file-service.interface';
import { join } from 'node:path';
import { writeFile, mkdir, unlink } from 'fs/promises';

@Injectable()
export class LocalFileService implements FileService {
  constructor() {
    mkdir(this.storagePath + '/avatars', { recursive: true });
    mkdir(this.storagePath + '/attachments', { recursive: true });
  }
  private storagePath = join(process.cwd() + '/src/filesystem/local-uploads');
  private logger = new Logger(LocalFileService.name);

  async uploadAvatar(file: Express.Multer.File) {
    const folder = join(this.storagePath, '/avatars');
    const filePath = join(folder, file.filename);
    writeFile(filePath, file.buffer);
    return `/avatars/${file.filename}`;
  }

  async uploadAttachments(files: Express.Multer.File[]) {
    const folder = join(this.storagePath, '/attachments');
    return files.map(file => {
      const filePath = join(folder, file.filename);
      writeFile(filePath, file.buffer);
      return `/attachments/${file.filename}`;
    });
  }

  async deleteFile(filePath: string) {
    try {
      if (filePath !== process.env.USER_DEFAULT_AVATAR) {
        return unlink(join(this.storagePath, filePath));
      }
    } catch (e) {
      this.logger.error(e);
    }
  }
}
