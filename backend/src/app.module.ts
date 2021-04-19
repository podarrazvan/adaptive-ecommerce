import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigsModule } from './modules/config/configs.module';

@Module({
  imports: [
    ConfigsModule,
    MongooseModule.forRoot(
      'mongodb+srv://razvan:30DUSP766JmuJgyt@cluster0.lseak.mongodb.net/myFirstDatabase',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
