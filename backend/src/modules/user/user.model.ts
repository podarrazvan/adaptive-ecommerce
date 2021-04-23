import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, requird: true, unique: true },
  email: { type: String, requird: true, unique: true },
  password: { type: String, requird: true },
  favorites: [{ type: String }], //product's id
  history: [
    {
      product: { type: String }, //product's id
      //TODO time: {type: Number} //time spent on a product in seconds
    },
  ],
  categories: [{ type: String }], //top most viewed categories
  isAdmin: { type: Boolean },
  recoveryPasswordCode: { type: String },
});

export interface IUser {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  // settings?: Settings;
  // addresses?: Address;
  favorites?: string[];
  history: string[];
  lastVisit: Date;
  categories: string[];
  isActive?: boolean;
  token?: string;
}
