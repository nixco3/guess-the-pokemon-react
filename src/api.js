export function fetchPokemonData() {
    const pokemonId = Math.floor(Math.random() * 700) + 1;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  
    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        return {
          name: data.name,
          image: data.sprites.front_default,
        };
      });
  }
  