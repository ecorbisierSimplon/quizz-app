import {
  Controller,
  // Get,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
// import { FileService } from './file.service';

@Controller('upload')
export class FileController {
  constructor() {}
  // @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/img',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async local(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return {
      statusCode: 200,
      data: file.path,
    };
  }
}
