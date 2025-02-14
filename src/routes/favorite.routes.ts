import express, { Router } from "express";
import {
  updateFavoritePokemon,
  getFavoritePokemon,
} from "../controllers/favorite.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router: Router = express.Router();

router.post("/update", authMiddleware, updateFavoritePokemon);
router.get("/list", authMiddleware, getFavoritePokemon);

export default router;
