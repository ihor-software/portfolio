import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { LocalFileService } from './services/local-file.service';
import { AwsFileService } from './services/aws-file.service';

@Module({
  imports: [],
  controllers: [FileController],
  providers: [
    {
      provide: 'FileService',
      useClass: process.env.NODE_ENV === 'production' ? AwsFileService : LocalFileService,
    },
  ],
})
export class FileModule {}
