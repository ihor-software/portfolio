import { HttpException, HttpStatus } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { extname } from 'path';

export const avatarMulterOptions: MulterOptions = {
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|svg\+xml)$/)) {
      file.filename = new Date().getTime().toString() + extname(file.originalname);
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
};

export const attachmentsMulterOptions: MulterOptions = {
  fileFilter: (req, file, cb) => {
    file.filename = new Date().getTime().toString() + extname(file.originalname);
    cb(null, true);
  },
};
