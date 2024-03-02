let currentPokemon; // Declares a variable 'currentPokemon' to store the currently processed Pokémon.
let pokemonID = 1; // Sets the initial ID for Pokémon to 1.
const totalPokemon = 151; // Defines the total number of Pokémon to be loaded as a constant (151).
let allPokemons = {}; // Creates an empty object 'allPokemons' to store all loaded Pokémon.
let clickedPokemonID; // ID of the currently clicked Pokémon

async function init() {
    for (pokemonID = 1; pokemonID <= totalPokemon; pokemonID++) {
        await loadPokemon(); // Iterates over Pokémon IDs and loads each Pokémon individually.
    }
    stopLoadingAnimation(); // Stops the loading animation once all Pokémon have been loaded.
}


async function loadPokemon() {
    try {
        let url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonID; // Constructs the URL for the Pokémon API.
        let response = await fetch(url); // Sends an asynchronous request to the Pokémon API.
        let pokemonData = await response.json(); // Converts the API response into a JavaScript object.

        allPokemons[pokemonData.id] = pokemonData; // Stores the Pokémon in the 'allPokemons' object.

        currentPokemon = pokemonData; // Sets the current Pokémon for further processing.
        renderPokemonInfo(); // Calls the function to render information about the Pokémon.
    } catch (error) {
        console.error('Error loading Pokemon:', error); // Displays an error in the console if loading fails.
    }
}

function stopLoadingAnimation() {
    const loadingPokeball = document.getElementById('loadingPokeball'); // Accesses the loading animation element.
    loadingPokeball.classList.add('finish'); // Adds the 'finish' class to the element to stop the animation.
}

function createPokemonCard() {
    // Creates a new div element to represent a Pokémon card.
    let card = document.createElement('div');
    card.className = 'pokemonCard'; // Sets the class name for styling purposes.
    card.setAttribute('data-pokemon-id', currentPokemon.id); // Sets the 'data-pokemon-id' attribute to store the Pokémon's ID.
    card.addEventListener('click', onCardClick); // Adds a click event listener to the card.
    return card; // Returns the created card element.
}


function formatPokemonName(name) {
    // Capitalizes the first letter of the Pokémon's name and returns it.
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function setBackgroundColorForCard(card, pokemonType) {
    // Sets the background color of the card based on the Pokémon's primary type.
    let firstTypeColor = getColorByType(pokemonType['types'][0]['type']['name']);
    card.style.backgroundColor = firstTypeColor.light;
}

function createTypesContent(types) {
    let typesContent = '';
    // Generates HTML content for displaying the Pokémon's types with proper capitalization and styling.
    types.forEach(type => {
        let typeName = type['type']['name'];
        let capitalizedTypeName = typeName.charAt(0).toUpperCase() + typeName.slice(1);
        let typeDiv = `<div class="pokemonType" style="background-color: ${getColorByType(typeName).dark}">${capitalizedTypeName}</div>`;
        typesContent += typeDiv;
    });
    return typesContent;
}

function appendCardToDocument(card) {
    // Appends the generated Pokémon card to the document.
    document.getElementById('allCards').appendChild(card);
}

function renderPokemonInfo() {
    // Renders information about the current Pokémon onto a card.
    let card = createPokemonCard(); // Creates a new Pokémon card element.
    let capitalizedName = formatPokemonName(currentPokemon['name']); // Formats the Pokémon's name.
    setBackgroundColorForCard(card, currentPokemon); // Sets the background color of the card.
    let typesContent = createTypesContent(currentPokemon['types']); // Generates content for the Pokémon's types.

    // Sets the inner HTML of the card with the Pokémon's information.
    card.innerHTML = `
        <h2>${capitalizedName}</h2>
        <div>#${currentPokemon['id']}</div>
        <img src="${currentPokemon['sprites']['other']['dream_world']['front_default']}" alt="${capitalizedName}">
        <div class="allTypes">${typesContent}</div>
    `;
    appendCardToDocument(card); // Appends the card to the document.
}


function getColorByType(type) { // Definiert ein Objekt mit Farben für jeden Pokémon-Typ.
    const typeColors = { // ... (Farbdefinitionen für jeden Typ)
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

function onCardClick(event) {
    // Retrieves the ID of the clicked Pokémon from the data attribute of the clicked card.
    const pokemonId = event.currentTarget.getAttribute('data-pokemon-id');
    // Retrieves the Pokémon object corresponding to the clicked ID.
    const pokemon = getPokemonById(pokemonId);
    // Sets the clicked Pokémon as the currently selected Pokémon.
    setClickedPokemon(pokemon);
    // Shows the information element to display details about the clicked Pokémon.
    showInfoElement();

    // Capitalizes the name of the clicked Pokémon.
    const capitalizedPokemonName = capitalizeString(pokemon.name);
    // Retrieves the color corresponding to the primary type of the clicked Pokémon.
    const firstTypeColor = getColorByType(pokemon.types[0].type.name);
    // Sets the background color of the information element based on the primary type color.
    setInfoElementBackground(firstTypeColor.light);

    // Generates HTML content for displaying the types of the clicked Pokémon.
    const typesContent = createTypesContent(pokemon.types);
    // Generates HTML content for displaying the abilities of the clicked Pokémon.
    const abilitiesContent = createAbilitiesContent(pokemon.abilities);

    // Converts the height and weight of the clicked Pokémon to proper units for display.
    const pokemonHeight = pokemon.height / 10; // Height in meters
    const pokemonWeight = pokemon.weight / 10; // Weight in kilograms

    // Renders detailed information about the clicked Pokémon.
    renderInfoElement(capitalizedPokemonName, pokemon, typesContent, abilitiesContent, pokemonHeight, pokemonWeight);
}


function getPokemonById(id) {
    // Retrieves a Pokémon from the 'allPokemons' object based on its ID.
    return allPokemons[id];
}

function setClickedPokemon(pokemon) {
    // Sets the clicked Pokémon as the currently selected Pokémon.
    clickedPokemonID = pokemon;
}

function showInfoElement() {
    // Displays the information element by removing the 'display-none' class from its class list.
    document.getElementById('furtherInformation').classList.remove('display-none');
    // Displays the pop-up element by removing the 'display-none' class from its class list.
    document.getElementById('popUp').classList.remove('display-none');
}

function capitalizeString(string) {
    // Capitalizes the first letter of a given string.
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setInfoElementBackground(color) {
    // Sets the background color of the information element.
    document.getElementById('furtherInformation').style.backgroundColor = color;
}

function createTypesContent(types) {
    // Generates HTML content for displaying the types of a Pokémon with proper capitalization and styling.
    return types.map(type => {
        const capitalizedTypeName = capitalizeString(type.type.name);
        // Constructs a div element for each type with its corresponding background color.
        return `<div class="pokemonType" style="background-color: ${getColorByType(type.type.name).dark}">${capitalizedTypeName}</div>`;
    }).join('');
}

function createAbilitiesContent(abilities) {
    // Generates HTML content for displaying the abilities of a Pokémon with proper capitalization and formatting.
    return abilities.map(ability => capitalizeString(ability.ability.name)).join(', ');
}

function renderInfoElement(name, pokemon, typesContent, abilitiesContent, height, weight) {
    // Renders detailed information about a Pokémon in the information element.
    const infoElement = document.getElementById('furtherInformation');
    infoElement.innerHTML = `
        <button onclick="closePopUp()" type="button" class="btn-close" aria-label="Close" id="popUpCloseButton"></button>
        <h1 id="popUpName">${name}</h1>
        <img class="infoElementImg" id="popUpImg" src="${pokemon.sprites.other.dream_world.front_default}">
        <div id="popUpType">${typesContent}</div>
        <div id="popUpId">#${pokemon.id}</div>
        <div id="popUpLowerPart">
            <div id="popUpLowerPartTopics">
                <div onclick="renderAbout()" id="About" class="fontUnderline">About</div>
                <div onclick="renderBaseStats()" id="Base Stats">Base Stats</div>
                <div onclick="renderMoves()" id="Moves">Moves</div>
            </div>
            <div id="popUpLowerPartText">
                <div class="nameWithValue"><div class="valueName">Base Experience: </div><div>${pokemon.base_experience}</div></div>
                <div class="nameWithValue"><div class="valueName">Abilities: </div><div>${abilitiesContent}</div></div>
                <div class="nameWithValue"><div class="valueName">Height: </div><div>${height} m</div></div>
                <div class="nameWithValue"><div class="valueName">Weight: </div><div>${weight} kg</div></div>
            </div>
        </div>
    `;
}


// Close the pop-up when called.
function closePopUp() {
    const infoElement = document.getElementById('furtherInformation');
    infoElement.classList.add("display-none");
    const infoElement2 = document.getElementById('popUp');
    infoElement2.classList.add("display-none");
}

// Render moves for the selected Pokémon.
function renderMoves() {
    const pokemon = clickedPokemonID; // Access the currently selected Pokémon.
    const moves = pokemon['moves']; // Access the moves of the Pokémon.
    let movesContent = '<div class="moves-container">'; // Start a container for the moves.

    // Use the first type of the Pokémon as the color for the moves.
    const moveColor = getColorByType(pokemon['types'][0]['type']['name']).light;

    // Iterate through all moves of the Pokémon and add them to the movesContent string.
    moves.forEach(move => {
        let moveName = move['move']['name']; // Get the name of the current move.
        moveName = moveName.charAt(0).toUpperCase() + moveName.slice(1); // Capitalize the first letter of the move name.
        // Add the move to the movesContent string, including the type color.
        movesContent += `<span class="move" style="background-color: ${moveColor};">${moveName}</span>`;
    });

    movesContent += '</div>'; // Close the container.

    // Update the lower part of the pop-up with the movesContent.
    document.getElementById('popUpLowerPart').innerHTML = `
    <div id="popUpLowerPartTopics">
        <div onclick="renderAbout()" id="About">About</div>
        <div onclick="renderBaseStats()" id="Base Stats">Base Stats</div>
        <div onclick="renderMoves()" id="Moves" class="fontUnderline">Moves</div>
    </div>
    <div id="popUpLowerPartText">
        ${movesContent}
    </div>
`;
}

function renderBaseStats() { // Render base stats for the selected Pokémon.
    const pokemon = clickedPokemonID;
    document.getElementById('popUpLowerPart').innerHTML = `
    <div id="popUpLowerPartTopics">
                <div onclick="renderAbout()" id="About">About</div>
                <div onclick="renderBaseStats()" id="Base Stats" class="fontUnderline" >Base Stats</div>
                <div onclick="renderMoves()" id="Moves" >Moves</div>
            </div>
            <div id="popUpLowerPartText">
                <div class="nameWithValue"><div class="valueName">HP: </div><div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${pokemon['stats']['0']['base_stat']}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> ${pokemon['stats']['0']['base_stat']}</div>
              </div></div>
                <div class="nameWithValue"><div class="valueName">Attack: </div><div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${pokemon['stats']['1']['base_stat']}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${pokemon['stats']['1']['base_stat']}</div>
              </div></div>
                <div class="nameWithValue"><div class="valueName">Defense: </div><div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${pokemon['stats']['2']['base_stat']}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${pokemon['stats']['2']['base_stat']}</div>
              </div></div>
                <div class="nameWithValue"><div class="valueName">Sp. Atk: </div><div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${pokemon['stats']['3']['base_stat']}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${pokemon['stats']['3']['base_stat']}</div>
              </div></div>
                <div class="nameWithValue"><div class="valueName">Sp. Def: </div><div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${pokemon['stats']['4']['base_stat']}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${pokemon['stats']['4']['base_stat']}</div>
              </div></div>
                <div class="nameWithValue"><div class="valueName">Speed: </div><div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${pokemon['stats']['5']['base_stat']}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${pokemon['stats']['5']['base_stat']}</div>
              </div></div>
            </div>
    `;;
}

// Render information about the selected Pokémon.
function renderAbout() {
    // Access the corresponding Pokémon object from the global storage.
    const pokemon = clickedPokemonID;

    // Create an array of ability names, capitalizing each name.
    let abilities = pokemon['abilities'].map(ability => {
        let abilityName = ability['ability']['name'];
        return abilityName.charAt(0).toUpperCase() + abilityName.slice(1);
    });

    // Join the elements of the array into a string, separated by ", ".
    let abilitiesContent = abilities.join(', ');

    let pokemonHeight = pokemon.height / 10;

    let pokemonWeight = pokemon.weight / 10;

    document.getElementById('popUpLowerPart').innerHTML = `
            <div id="popUpLowerPartTopics">
                <div onclick="renderAbout()" id="About" class="fontUnderline">About</div>
                <div onclick="renderBaseStats()" id="Base Stats">Base Stats</div>
                <div onclick="renderMoves()" id="Moves">Moves</div>
            </div>
            <div id="popUpLowerPartText">
                <div class="nameWithValue"><div class="valueName">Base Experience: </div><div>${pokemon.base_experience}</div></div>
                <div class="nameWithValue"><div class="valueName">Abilities: </div><div>${abilitiesContent}</div></div>
                <div class="nameWithValue"><div class="valueName">Height: </div><div>${pokemonHeight} m</div></div>
                <div class="nameWithValue"><div class="valueName">Weight: </div><div>${pokemonWeight} kg</div></div>
            </div>
    `;
}

// Add event listener to search input for filtering Pokémon on the fly.
document.getElementById('searchInput').addEventListener('input', filterPokemonsOnFly);

// Function to filter Pokémon cards based on search input.
function filterPokemonsOnFly() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const cardsContainer = document.getElementById('allCards');
    const cards = cardsContainer.getElementsByClassName('pokemonCard');

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let pokemonName = card.querySelector('h2').textContent.toLowerCase();
        if (pokemonName.includes(searchTerm)) {
            card.style.display = ""; // Show card
        } else {
            card.style.display = "none"; // Hide card
        }
    }
}

init(); // Start loading Pokémon once the page is loaded.

