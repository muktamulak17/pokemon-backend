import { Request, Response } from "express";

interface PokemonListData {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

interface PokemonData {
  name: string | null;
  species: { url: string };
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
}

interface SpeciesData {
  evolution_chain: { url: string };
}

interface EvolutionData {
  chain: {
    species: { name: string; url: string };
    evolves_to: [];
  };
}

// fetch first 150 pokemon list
export const getPokemonList = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { offset, limit } = req.query;
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const data = (await response.json()) as PokemonListData;
    res.json(data.results);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch the pokemon list` });
  }
};

// Fetch pokemon details like Abilities,Types, Evolutions
export const getPokemonDetails = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name } = req.params;
    if (!name)
      return res.status(400).json({ error: "Invalid request parameters" });

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemonData = (await response.json()) as PokemonData;

    //fetch evolution data
    const speciesResponse = await fetch(pokemonData?.species?.url);
    const speciesData = (await speciesResponse.json()) as SpeciesData;

    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    const evolutionData = (await evolutionResponse.json()) as EvolutionData;

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
