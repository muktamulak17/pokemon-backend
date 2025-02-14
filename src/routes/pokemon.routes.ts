import express, { Router } from "express";
import {
  getPokemonList,
  getPokemonDetails,
} from "../controllers/pokemon.controller";

const router: Router = express.Router();

router.get("/list", getPokemonList);
router.get("/:name", getPokemonDetails);

export default router;
