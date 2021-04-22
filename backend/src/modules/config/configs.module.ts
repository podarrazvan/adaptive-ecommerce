import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigsController } from './configs.controllers';
import { ConfigsSchema } from './configs.model';
import { ConfigsService } from './configs.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Configs', schema: ConfigsSchema }]),
  ],
  controllers: [ConfigsController],
  providers: [ConfigsService],
})
export class ConfigsModule {}
