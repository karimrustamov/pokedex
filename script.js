let currentPokemon;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/pikachu';
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log('Loaded Pokemon:', currentPokemon)

    renderPokemonInfo();
}

//function renderPokemonInfo () {
//    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
//}

function renderPokemonInfo() {
    let name = currentPokemon['name']; // Hole den Namen
    let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1); // Erste Buchstabe großschreiben und Rest beibehalten
    document.getElementById('pokemonName').innerHTML = capitalizedName; // Setze den Namen in das HTML-Element
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['front_default']
}