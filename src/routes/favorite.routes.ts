import express, { Router } from "express";
import {
  updateFavoritePokemon,
  getFavoritePokemon,
} from "../controllers/favorite.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.post("/update", authMiddleware, updateFavoritePokemon);
router.get("/list", authMiddleware, getFavoritePokemon);

export default router;
