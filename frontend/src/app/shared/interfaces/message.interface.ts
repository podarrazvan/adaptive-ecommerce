export interface Message {
  name: string;
  subject: string;
  email: string;
  message: string;
  date: Date;
  seen: boolean;
  _id?: string;
}
