let pokemonsJson = []
const containerPokemon = document.querySelector('.pokemons__container');
const botao = document.querySelector('#botao');
let limite = 20

botao.addEventListener('click', _ => getPokemons(limite += 40))

async function getPokemons(limit) {
    const url = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`);
    pokemonsJson = await url.json()
    mostraPokemons()
}

function mostraPokemons() {
    containerPokemon.innerHTML = ''
    pokemonsJson.results.forEach(async function(element){
        const detalhes = await fetch(element.url)
        const detalhesJson = await detalhes.json()
        const tiposPokemon = detalhesJson.types[0].type.name
        containerPokemon.innerHTML += `
            <li class="pokemon">
                <img src="https://img.pokemondb.net/artwork/large/${element.name}.jpg" class="imgPoke" id="imgPokemon" alt="${element.name}">
                <p class="nomePokemon">${element.name}</p>
                <p class="nomePokemon ${tiposPokemon == 'fire' ? 'fire' : 'pokemonType' && tiposPokemon == 'bug' ? 'bug' : 'pokemonType' && tiposPokemon == 'grass' ? 'grass' : 'pokemonType' && tiposPokemon == 'normal' ? 'normal' : 'pokemonType' && tiposPokemon == 'water' ? 'water' : 'pokemonType'}">${tiposPokemon}</p>
            </li>
        `
    });
}

getPokemons()