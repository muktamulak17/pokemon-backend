import { Request, Response } from "express";

// fetch first 150 pokemon list
export const getPokemonList = async (req: Request, res: Response) => {
  const { offset, limit } = req.query;
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch the pokemon list` });
  }
};

// Fetch pokemon details like Abilities,Types, Evolutions
export const getPokemonDetails = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    if (!name)
      return res.status(400).json({ error: "Invalid request parameters" });

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemonData = await response.json();

    //fetch evolution data
    const speciesResponse = await fetch(pokemonData.species.url);
    const speciesData = await speciesResponse.json();
    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionResponse.json();

    res.json({
      name: pokemonData.name,
      abilities: pokemonData.abilities.map((a: any) => a.ability.name),
      types: pokemonData.types.map((t: any) => t.type.name),
      evolutions: evolutionData.chain
        ? extractEvolutions(evolutionData.chain)
        : [],
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pokemon details" });
  }
};

// Helper function to extract evolution chain
const extractEvolutions = (chain: any): string[] => {
  let evolutions: string[] = [];
  let current = chain;
  while (current) {
    evolutions.push(current.species.name);
    current = current.evolves_to.length ? current.evolves_to[0] : null;
  }
  return evolutions;
};
