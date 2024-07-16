let currentPokemonId = 1;
let isShiny = false;

function searchPokemon() {
    const pokemonName = document.getElementById('pokemon-name').value.trim().toLowerCase();
    if (pokemonName) {
        fetchPokemon(pokemonName);
    }
}

async function fetchPokemon(nameOrId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }
        const data = await response.json();
        currentPokemonId = data.id;
        displayPokemon(data);
        document.getElementById('previous-button').disabled = currentPokemonId <= 1;
        document.getElementById('next-button').disabled = false;
    } catch (error) {
        document.getElementById('pokemon-info').textContent = 'Pokémon no encontrado.';
        document.getElementById('pokemon-image').src = '';
        document.getElementById('previous-button').disabled = true;
        document.getElementById('next-button').disabled = true;
    }
}

function displayPokemon(data) {
    const sprite = isShiny ? data.sprites.front_shiny : data.sprites.front_default;
    document.getElementById('pokemon-image').src = sprite || '';
    document.getElementById('pokemon-name-display').textContent = data.name.toUpperCase();
    document.getElementById('pokemon-id-display').textContent = `No. ${data.id}`;
    document.getElementById('pokemon-info').textContent = `
        Nombre: ${data.name.toUpperCase()}
        Tipo: ${data.types.map(type => type.type.name).join(', ')}
        Altura: ${data.height / 10} m
        Peso: ${data.weight / 10} kg
    `;
}

function previousPokemon() {
    if (currentPokemonId > 1) {
        fetchPokemon(currentPokemonId - 1);
    }
}

function nextPokemon() {
    fetchPokemon(currentPokemonId + 1);
}

function toggleShiny() {
    isShiny = !isShiny;
    fetchPokemon(currentPokemonId);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchPokemon(1);  // Carga el primer Pokémon al iniciar
});
