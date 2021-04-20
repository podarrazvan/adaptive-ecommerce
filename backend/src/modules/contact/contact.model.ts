import * as mongoose from 'mongoose';

export const EmailSchema = new mongoose.Schema({
  name: { type: String, requird: true },
  email: { type: String, requird: true },
  subject: { type: String, requird: true },
  message: { type: String, requird: true },
  date: { type: Date, requird: true },
  seen: { type: Boolean, requird: true },
});

export interface IEmail {
    name: string;
    email: string;
    subject: string;
    message: string;
    date: Date;
    seen: string;
}
