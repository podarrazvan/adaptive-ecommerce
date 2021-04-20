import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
import { IEmail } from './contact.model';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  async createEmail(
    @Body('data') data: IEmail)
   {
    const contact = this.contactService.createEmail(data);
    return contact;
  }

  @Get()
  async getEmails() {
    return this.contactService.getEmails();
  }

  @Put(':id')
  async updateEmail(
    @Param('id') id: string,
    @Body('status') status: string
  ) {
   return this.contactService.updateEmail(id, status);
  }
 
}
