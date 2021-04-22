import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEmail } from './contact.model';

@Injectable()
export class ContactService {
  constructor(@InjectModel('Contact') private contactModel: Model<any>) {}

  async createEmail(data: IEmail) {
    const { name, email, subject, message, date, seen } = data;
    const emailData = {
      name,
      email,
      subject,
      message,
      date,
      seen,
    };
    const newEmail = new this.contactModel(emailData);
    const result = await newEmail.save();
    return result;
  }

  async getEmails() {
    const result = await this.contactModel.find().exec();
    return result;
  }

  async updateEmail(_id: string, status: string) {
    const result = await this.contactModel
      .findByIdAndUpdate({ _id }, { status })
      .exec();
    return result;
  }
}
