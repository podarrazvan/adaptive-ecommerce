import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckAdmin } from 'src/shared/middlewares/check-admin';
import { ConfigsController } from './configs.controllers';
import { ConfigsSchema } from './configs.model';
import { ConfigsService } from './configs.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'configs', schema: ConfigsSchema }]),
  ],
  controllers: [ConfigsController],
  providers: [ConfigsService],
})
export class ConfigsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckAdmin).forRoutes(ConfigsController);
  }
}
