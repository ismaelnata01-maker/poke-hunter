const API_URL = "https://pokeapi.co/api/v2/pokemon"

interface PokemonAPIResponse{
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonAPIItem[]
}

interface PokemonAPIItem{
    name: string;
    url: string;
}

export interface Pokemon{
    id: number;
    name: string;
    image: string;
}

interface PokemonPage{
    pokemonList: Pokemon[];
    hasNextPage: boolean;
}

export async function getPokemonList(limit = 20, offset = 0){
    const response = await fetch(`${API_URL}?limit=${limit}&offset=${offset}`);

    if (!response.ok){
        throw new Error("Não foi possível carregar a lista de pokémon.");
    }

    const data = (await response.json()) as PokemonAPIResponse;

    const pokemonList = data.results.map((pokemon) => {
        const id = parseInt(pokemon.url.split("/").filter(Boolean).pop() || "0");

        return{
            id,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        }
    });

    return{
        pokemonList,
        hasNextPage: Boolean(data.next),
    } as PokemonPage;
}