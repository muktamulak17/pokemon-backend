import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import pokemonRoutes from "./routes/pokemon.routes";
import favoriteRoutes from "./routes/favorite.routes";
import authRoutes from "./routes/auth.routes";

//Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(cors());
app.use(express.json());

//Database connection
connectDB();

//Routes
app.use("/auth", authRoutes);
app.use("/pokemon", pokemonRoutes);
app.use("/favorites", favoriteRoutes);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
