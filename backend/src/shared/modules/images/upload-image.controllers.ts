import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Observable, of } from 'rxjs';

@Controller('images')
export class UploadImageController {
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: '../images',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  uploadedFile(@UploadedFile() file) {
    const path = `http://localhost:3000/images/${file.originalname}`;
    return { url: path };
  }

  @Get(':imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res): Observable<any> {
    return of(res.sendFile(join(process.cwd(), '../images/' + imagename)));
  }
}
