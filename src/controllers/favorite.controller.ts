import { Request, Response } from "express";
import { Favorite, IFavourite } from "../models/favorite.model";

// Add or Remove favorite pokemon
export const updateFavoritePokemon = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, username, action } = req.body;
  try {
    if (action === "add") {
      await Favorite.create({ name, username });
    } else if (action === "remove") {
      const dd = await Favorite.deleteOne({ name: name, username: username });
    }

    const favorites = await Favorite.find({ username });
    res.json({
      favorites: favorites.map((fav: IFavourite) => {
        return { name: fav.name, id: fav._id };
      }),
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to ${action} favorites` });
  }
};

//Get favorite pokemon of the user
export const getFavoritePokemon = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { username } = req.query;
  try {
    const favorites = await Favorite.find({ username });
    if (favorites.length <= 0)
      return res
        .status(200)
        .json({ error: `Oops, there are no favorites added in your list` });

    res.json({
      favorites: favorites.map((fav) => {
        return { name: fav.name, id: fav._id };
      }),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch favorite pokemons" });
  }
};
