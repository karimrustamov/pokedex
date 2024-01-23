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
    let card = document.createElement('div');
    card.className = 'pokemonCard';

    let name = currentPokemon['name'];
    let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    let typesContent = '';
    currentPokemon['types'].forEach(type => {
        typesContent += `<div>${type['type']['name']}</div>`;
    });

    card.innerHTML = `
        <h2>${capitalizedName}</h2>
        <img src="${currentPokemon['sprites']['front_default']}" alt="${capitalizedName}">
        <div>#${currentPokemon['id']}</div>
        ${typesContent}
    `;

    document.getElementById('allCards').appendChild(card);
}

