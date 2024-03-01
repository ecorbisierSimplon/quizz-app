import {
  Controller,
  // Get,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  Body,
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
    console.log('info file : ' + myImg);
    // return myImg;

    return {
      statusCode: 200,
      data: myImg.path,
    };
  }
  @Post('/body')
  @UseInterceptors(
    FileInterceptor('myImg', {
      // configurations du FileInterceptor
    }),
  )
  async myBody(
    @UploadedFile() myImg, // Utilisez @UploadedFile() pour injecter le fichier
  ) {
    console.log('Fichier reçu :', myImg);
    return myImg;
    // Le reste de votre logique de contrôleur ici
  }
}
