import mongoose, { Schema, Document } from "mongoose";

export interface IFavourite extends Document {
  _id: string;
  name: string;
  username: string;
}

const favoriteSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  username: { type: String, required: true },
});

export const Favorite = mongoose.model<IFavourite>("Favorite", favoriteSchema);
