// Function to fetch all the names and URLs of every Pokemon in the database
async function fetchAllPokemon() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1000');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Fetch all the Pokemon names and URLs
async function fetchAndGenerateRandomPokemonData() {
  try {
    const pokemonList = await fetchAllPokemon();
    const randomPokemon = pickRandomThree(pokemonList);
    for (const pokemon of randomPokemon) {
      await fetchPokemonData(pokemon.url);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Add click event listener to the button
const randomPokemonButton = document.getElementById('random-pokemon-btn');
randomPokemonButton.addEventListener('click', fetchAndGenerateRandomPokemonData);

// Function to fetch data for a specific Pokemon using its URL
async function fetchPokemonData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const name = data.name;
    const imageUrl = data.sprites.front_default;
    const speciesURL = data.species.url;
    await fetchPokemonSpeciesData(name, imageUrl, speciesURL);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Function to fetch species data for a specific Pokemon using its species URL
async function fetchPokemonSpeciesData(name, imageUrl, speciesURL) {
  try {
    const response = await fetch(speciesURL);
    const data = await response.json();
    const description = data.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;
    displayPokemonData(name, imageUrl, description);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}