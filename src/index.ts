import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import pokemonRoutes from "./routes/pokemon.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";
import authRoutes from "./routes/auth.routes.js";

//Load environment variables
dotenv.config();
const app: Application = express();
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
