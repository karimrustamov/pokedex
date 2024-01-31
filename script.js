let currentPokemon; // Deklariert eine Variable 'currentPokemon', um das aktuell verarbeitete Pokémon zu speichern.
let pokemonID = 1; // Setzt die Anfangs-ID für Pokémon auf 1.
const totalPokemon = 151; // Definiert die Gesamtanzahl der Pokémon, die geladen werden sollen, als Konstante (151).
let allPokemons = {}; // Erstellt ein leeres Objekt 'allPokemons', um alle geladenen Pokémon zu speichern.



async function init() {
    for (pokemonID = 1; pokemonID <= totalPokemon; pokemonID++) {
        await loadPokemon(); // Iteriert über Pokémon-IDs und lädt jedes Pokémon einzeln.
    }
    stopLoadingAnimation(); // Stoppt die Ladeanimation, sobald alle Pokémon geladen wurden.
}


async function loadPokemon() {
    try {
        let url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonID; // Erstellt die URL für die Pokémon-API.
        let response = await fetch(url); // Sendet eine asynchrone Anfrage an die Pokémon-API.
        let pokemonData = await response.json(); // Wandelt die Antwort der API in ein JavaScript-Objekt um.

        allPokemons[pokemonData.id] = pokemonData; // Speichert das Pokémon im 'allPokemons'-Objekt.

        currentPokemon = pokemonData; // Setzt das aktuelle Pokémon für weitere Verarbeitung.
        renderPokemonInfo(); // Ruft die Funktion auf, um Informationen über das Pokémon zu rendern.
    } catch (error) {
        console.error('Error loading Pokemon:', error); // Zeigt einen Fehler in der Konsole an, falls das Laden fehlschlägt.
    }
}



function stopLoadingAnimation() {
    const loadingPokeball = document.getElementById('loadingPokeball'); // Zugriff auf das Ladeanimationselement.
    loadingPokeball.classList.add('finish'); // Fügt der Klasse des Elements 'finish' hinzu, um die Animation zu stoppen.
}


function renderPokemonInfo() {
    let card = document.createElement('div'); // Erstellt ein neues 'div'-Element für die Pokémon-Karte.
    card.className = 'pokemonCard'; // Weist der Karte eine Klasse zu.
    card.setAttribute('data-pokemon-id', currentPokemon.id); // Setzt die Pokémon-ID als Datenattribut der Karte.
    card.addEventListener('click', onCardClick); // Fügt einen Klick-Event-Listener hinzu, um auf Klicks zu reagieren.

    // Erstellt und formatiert den Namen des Pokémon.
    let name = currentPokemon['name'];
    let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    let typesContent = ''; // Initialisiert einen leeren String für Pokémon-Typen.
    let firstTypeColor = getColorByType(currentPokemon['types'][0]['type']['name']); // Holt die Farbe des ersten Typs.
    card.style.backgroundColor = firstTypeColor.light; // Setzt die Hintergrundfarbe der Karte basierend auf dem Pokémon-Typ.

    // Iteriert über die Typen des Pokémon und erstellt HTML-Elemente dafür.
    currentPokemon['types'].forEach(type => {
        let typeName = type['type']['name'];
        let capitalizedTypeName = typeName.charAt(0).toUpperCase() + typeName.slice(1);
        let typeDiv = `<div class="pokemonType" style="background-color: ${getColorByType(typeName).dark}">${capitalizedTypeName}</div>`;
        typesContent += typeDiv;
    });

    // Setzt das innere HTML der Karte mit Pokémon-Informationen.
    card.innerHTML = `
        <h2>${capitalizedName}</h2>
        <div>#${currentPokemon['id']}</div>
        <img src="${currentPokemon['sprites']['other']['dream_world']['front_default']}" alt="${capitalizedName}">
        <div class="allTypes">${typesContent}</div>
    `;

    // Fügt die Karte dem Dokument hinzu.
    document.getElementById('allCards').appendChild(card);
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
    // Holen Sie die Pokémon-ID aus dem Datenattribut des angeklickten Elements
    const pokemonId = event.currentTarget.getAttribute('data-pokemon-id');

    // Greifen Sie auf das entsprechende Pokémon-Objekt aus dem globalen Speicher zu
    const pokemon = allPokemons[pokemonId];

    // Entfernen Sie die Klasse 'display-none', um das Element sichtbar zu machen
    const infoElement = document.getElementById('furtherInformation');
    infoElement.classList.remove("display-none");
    const infoElement2 = document.getElementById('popUp');
    infoElement2.classList.remove("display-none");

    //Macht beim PopUp den Pokemonnamen großgeschrieben
    let capitalizedTypeName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    let typesContent = ''; // Initialisiert einen leeren String für Pokémon-Typen.
    let firstTypeColor = getColorByType(pokemon['types'][0]['type']['name']); // Holt die Farbe des ersten Typs.
    furtherInformation.style.backgroundColor = firstTypeColor.light; // Setzt die Hintergrundfarbe der Karte basierend auf dem Pokémon-Typ.
    let abilitiesContent = '';

    // Iteriert über die Typen des Pokémon und erstellt HTML-Elemente dafür.
    pokemon['types'].forEach(type => {
        let typeName = type['type']['name'];
        let capitalizedTypeName = typeName.charAt(0).toUpperCase() + typeName.slice(1);
        let typeDiv = `<div class="pokemonType" style="background-color: ${getColorByType(typeName).dark}">${capitalizedTypeName}</div>`;
        typesContent += typeDiv;
    });

    // Erstellt ein Array aus den Namen der Abilities, wobei jeder Name kapitalisiert wird.
    let abilities = pokemon['abilities'].map(ability => {
        let abilityName = ability['ability']['name'];
        return abilityName.charAt(0).toUpperCase() + abilityName.slice(1);
    });

    // Verbindet die Elemente des Arrays zu einem String, getrennt durch ", ".
    abilitiesContent = abilities.join(', ');

    let pokemonHeight = pokemon.height / 10;

    let pokemonWeight = pokemon.weight / 10;

    // Setzen des Inhalts des Info-Elements mit dem Namen des Pokémons
    infoElement.innerHTML = `
        <button onclick="closePopUp()" type="button" class="btn-close" aria-label="Close"></button>
        <h1>${capitalizedTypeName}</h1>
        <img class="infoElementImg" src="${pokemon['sprites']['other']['dream_world']['front_default']}">
        <div>${typesContent}</div>
        <div>#${pokemon.id}</div>
        <div>Base Experience: ${pokemon.base_experience}</div>
        <div>Abilities: ${abilitiesContent}</div>
        <div>Height: ${pokemonHeight} m</div>
        <div>Height: ${pokemonWeight} kg</div>
    `;

    // Hier können Sie nun die gewünschten Informationen des Pokémon im Console-Log anzeigen
    console.log('Geklicktes Pokémon:', currentPokemon);

    // Zeigt das Popup an
    const popupElement = document.querySelector('.popUp');
    //popupElement.classList.add('popUpActive');
}

function closePopUp() {
    const infoElement = document.getElementById('furtherInformation');
    infoElement.classList.add("display-none");
    const infoElement2 = document.getElementById('popUp');
    infoElement2.classList.add("display-none");
}