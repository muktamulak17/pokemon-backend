import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  username: { type: String, required: true },
});

export const Favorite = mongoose.model("Favorite", favoriteSchema);
