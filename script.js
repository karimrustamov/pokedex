let currentPokemon;
let pokemonID = 1; // Start from the first Pokemon

async function init() {
    while (pokemonID <= 151) {
        await loadPokemon();
        pokemonID++;
    }
}

async function loadPokemon() {
    try {
        let url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonID;
        let response = await fetch(url);
        currentPokemon = await response.json();
        renderPokemonInfo();
    } catch (error) {
        console.error('Error loading Pokemon:', error);
    }
}

function renderPokemonInfo() {
    // Create a new card for each Pokemon
    let card = document.createElement('div');
    card.className = 'pokemonCard';

    let name = currentPokemon['name'];
    let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    
    card.innerHTML = `
        <h1>${capitalizedName}</h1>
        <img src="${currentPokemon['sprites']['front_default']}" alt="${capitalizedName}">
        <div>#${currentPokemon['id']}</div>
        <div>${currentPokemon['types'].map(type => type['type']['name']).join(', ')}</div>
    `;

    document.getElementById('allCards').appendChild(card);
}
