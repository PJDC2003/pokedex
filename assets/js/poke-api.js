const pokeApi = {} // Objeto que contém as funções da API

function convertPokemonApiDetailToPokemon(pokemonDetail) {
    const pokemon = new Pokemon();
    pokemon.name = pokemonDetail.name;
    pokemon.number = pokemonDetail.id;
    
    // pokemon.types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
    // pokemon.type = pokemon.types.get(0);  // cor de fundo é definida pelo primeiro tipo OU

    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;  // pega o primeiro elemento do array
    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default;

    return pokemon; // retorna o objeto pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {    
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokemonApiDetailToPokemon)
}


pokeApi.getPokemons = (offset = 0, limit = 10) => {    // valores padrão para offset e limit
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())   // retorna uma promise que é a resposta convertida para JSON e passa para o próximo then como argumento
        .then((jsonBody) => jsonBody.results)  // retorna a lista de pokemons (jsonBody.results) para o próximo then 
        // .catch((error) => console.log(error));
        .then ((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) 
        .then ((detailRequests) => Promise.all(detailRequests))  // Promise.all() --> retorna uma promise que é resolvida quando todas as promises no argumento são resolvidas
        .then ((pokemonsDetails) => pokemonsDetails)
}
