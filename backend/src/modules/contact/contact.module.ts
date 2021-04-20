import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactController } from './contact.controllers';
import { EmailSchema } from './contact.model';
import { ContactService } from './contact.service';

@Module ({
  imports: [MongooseModule.forFeature([{name: 'Email', schema: EmailSchema}])],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ConfigsModule {}
