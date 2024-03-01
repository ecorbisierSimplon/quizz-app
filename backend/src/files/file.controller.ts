import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('upload')
export class FileController {
  constructor() {}

  // @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(
    FileInterceptor('myImg', {
      storage: diskStorage({
        destination: 'public/img',
        filename: (req, myImg, cb) => {
          cb(null, myImg.originalname);
        },
      }),
    }),
  )
  async local(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp|gif)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
      new ParseFilePipeBuilder().build({
        fileIsRequired: false,
      }),
    )
    myImg: Express.Multer.File,
  ) {
    return {
      statusCode: 200,
      data: myImg.path,
    };
  }
}
