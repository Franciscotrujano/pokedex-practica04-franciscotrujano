const infoPokemon = document.querySelector ('[data-info-pokemon]');
const namePokemon = document.querySelector ('[data-name-pokemon]');
const imgPokemonContainer = document.querySelector ('[data-img-pokemon-container]');
const imgPokemon = document.querySelector ('[data-img-pokemon]');
const numberPokemon = document.querySelector ('[data-number-pokemon]');
const typePokemon = document.querySelector ('[data-type-pokemon]');
const detailsPokemon = document.querySelector ('[data-details-pokemon]');

const typeColor = {
    default: '#2A1A1F',
};


const buscarpokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types } = data;

    namePokemon.textContent = data.name;
    imgPokemon.setAttribute('src', sprite);
    numberPokemon.textContent = `# ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    
}

const setCardColor = types => {
    const colorOne = typeColor[types[0].type.name];
    const colorTwo = types[1] ? typeColor[types[1].type.name] : typeColor.default;
    imgPokemon.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    imgPokemon.style.backgroundSize = ' 5px 5px';
}

const renderPokemonTypes = types => {
    typePokemon.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColor[type.type.name];
        typeTextElement.textContent = type.type.name;
        typePokemon.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    detailsPokemon.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        detailsPokemon.appendChild(statElement);
    });
}

const renderNotFound = () => {
    namePokemon.textContent = 'No encontrado';
    imgPokemon.setAttribute('src', './img/notfound.pg');
    imgPokemon.style.background =  '#fff';
    typePokemon.innerHTML = '';
    detailsPokemon.innerHTML = '';
    numberPokemon.textContent = '';
}




/*select your pokemon*/

    /*BUSCADAOR*/
    const clearInput = () => {
      const input = document.getElementsByTagName("input")[0];
      input.value = "";
    }
    
    const clearBtn = document.getElementById("clear-btn");
    clearBtn.addEventListener("click", clearInput);
    