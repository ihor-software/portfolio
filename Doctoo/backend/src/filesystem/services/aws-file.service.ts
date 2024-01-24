import { BadGatewayException, Injectable } from '@nestjs/common';
import { FileService } from './file-service.interface';
import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';

@Injectable()
export class AwsFileService implements FileService {
  private s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  async uploadAvatar(file: Express.Multer.File) {
    const params: PutObjectCommandInput = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: 'avatars/' + file.filename,
      Body: file.buffer,
      ACL: 'public-read',
    };
    try {
      this.s3Client.send(new PutObjectCommand(params));
      return `https://${params.Bucket}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${params.Key}`;
    } catch (e: unknown) {
      throw new BadGatewayException(e);
    }
  }

  async uploadAttachments(files: Express.Multer.File[]) {
    return files.map(file => {
      const params: PutObjectCommandInput = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: 'attachments/' + file.filename,
        Body: file.buffer,
      };
      try {
        this.s3Client.send(new PutObjectCommand(params));
        return `https://${params.Bucket}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${params.Key}`;
      } catch (e: unknown) {
        throw new BadGatewayException(e);
      }
    });
  }

  async deleteFile(filePath: string) {
    const url = new URL(filePath);
    const params: DeleteObjectCommandInput = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: url.pathname.slice(1),
    };
    try {
      if (filePath !== process.env.USER_DEFAULT_AVATAR) {
        this.s3Client.send(new DeleteObjectCommand(params));
      }
    } catch (e: unknown) {
      throw new BadGatewayException(e);
    }
  }
}
