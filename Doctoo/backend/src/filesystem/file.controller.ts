import {
  Controller,
  Delete,
  Inject,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FileService } from './services/file-service.interface';
import { attachmentsMulterOptions, avatarMulterOptions } from './multer-options';

@Controller('files')
export class FileController {
  constructor(@Inject('FileService') private fileService: FileService) {}

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('avatar', avatarMulterOptions))
  uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadAvatar(file);
  }

  @Post('upload-attachments')
  @UseInterceptors(FilesInterceptor('attachments', 10, attachmentsMulterOptions))
  uploadAttachments(@UploadedFiles() files: Express.Multer.File[]) {
    return this.fileService.uploadAttachments(files);
  }

  @Delete()
  deleteFile(@Query('filePath') filePath: string) {
    return this.fileService.deleteFile(filePath);
  }
}
