import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadImageController } from './upload-image.controllers';

@Module({
  imports: [
    MulterModule.register({
      dest: '../images',
    }),
  ],
  controllers: [UploadImageController],
})
export class UploadImageModule {}
