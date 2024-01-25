let currentPokemon;
let pokemonID = 1;
const totalPokemon = 151;

async function init() {
    for (pokemonID = 1; pokemonID <= totalPokemon; pokemonID++) {
        await loadPokemon();
    }
    stopLoadingAnimation();
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

function stopLoadingAnimation() {
    const loadingPokeball = document.getElementById('loadingPokeball');
    loadingPokeball.classList.add('finish');
}

function renderPokemonInfo() {
    let card = document.createElement('div');
    card.className = 'pokemonCard';

    let name = currentPokemon['name'];
    let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    let typesContent = '';
    let firstTypeColor = getColorByType(currentPokemon['types'][0]['type']['name']);
    card.style.backgroundColor = firstTypeColor.light;

    currentPokemon['types'].forEach(type => {
        let typeName = type['type']['name'];
        let capitalizedTypeName = typeName.charAt(0).toUpperCase() + typeName.slice(1);
        let typeDiv = `<div class="pokemonType" style="background-color: ${getColorByType(typeName).dark}">${capitalizedTypeName}</div>`;
        typesContent += typeDiv;
    });

    card.innerHTML = `
        <h2>${capitalizedName}</h2>
        <div>#${currentPokemon['id']}</div>
        <img src="${currentPokemon['sprites']['front_default']}" alt="${capitalizedName}">
        ${typesContent}
    `;

    document.getElementById('allCards').appendChild(card);
}

function getColorByType(type) {
    const typeColors = {
        'normal': { light: '#C6C6A7', dark: '#6D6D4E' },
        'fire': { light: '#F5AC78', dark: '#9C531F' },
        'water': { light: '#9DB7F5', dark: '#445E9C' },
        'electric': { light: '#FAE078', dark: '#A1871F' },
        'grass': { light: '#A7DB8D', dark: '#4E8234' },
        'ice': { light: '#BCE6E6', dark: '#638D8D' },
        'fighting': { light: '#D67873', dark: '#7D1F1A' },
        'poison': { light: '#C183C1', dark: '#682A68' },
        'ground': { light: '#EBD69D', dark: '#927D44' },
        'flying': { light: '#C6B7F5', dark: '#6D5E9C' },
        'psychic': { light: '#FA92B2', dark: '#A13959' },
        'bug': { light: '#C6D16E', dark: '#6D7815' },
        'rock': { light: '#D1C17D', dark: '#786824' },
        'ghost': { light: '#A292BC', dark: '#493963' },
        'dragon': { light: '#A27DFA', dark: '#4924A1' },
        'dark': { light: '#A29288', dark: '#49392F' },
        'steel': { light: '#D1D1E0', dark: '#787887' },
        'fairy': { light: '#F4BDC9', dark: '#9B6470' },
    };

    return typeColors[type.toLowerCase()] || { light: '#A8A878', dark: '#6D6D4E' }; // Standardfarben
}
