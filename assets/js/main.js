// const offset = 0;
// const limit = 20;
// const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

//Request to the API  --> resposta assíncrona (responsa não é imediata) --> Promises

/* VERSÃO 1
fetch(url)  // por padrão o método com o fetch é GET
    .then(function (response) {
        
        console.log(response);  // resposta do servidor
        //  Network --> pokemon?offset=0&limit=10 --> Response: Content-Type: application/json; charset=utf-8
        //  Console --> Response --> body: ReadableStream ==> necessário converter para JSON

        response
            .json()
            .then(function (responseBody) { // response.json() retorna uma promise
                console.log(responseBody);  // resposta do servidor convertida para JSON
            })
    })

    .catch(function (error) {
        console.log(error);  // se der algum erro
    })
    .finally(function () {
        console.log('Requisição concluída!');  // sempre é executado
    }); */
// Esta é a interface de comunicação de uma promise  (baseado no bloco try/catch/finally)


// VERSÃO V2 SIMPLIFICADA 
/*fetch(url)
    .then(function (response) {  // função anónima
        return response.json();  // retorna uma promise que é a resposta convertida para JSON e passa para o próximo then como argumento
    })
    .then(function (jsonBody) {
        console.log(jsonBody);
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        console.log('Requisição concluída!');
    })*/

// VERSÃO V3 SIMPLIFICADA USANDO ARROW FUNCTIONS
/*fetch(url)
    .then(response => response.json())
    .then(jsonBody => console.log(jsonBody))
    .catch(error => console.log(error))*/

/*function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}



function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon">
            <span class="number">#${pokemon.order}</span>
            <span class="name">${pokemon.name}</span>  
            
            <div class="detail">
                <ol class="types">
                    ${convertPokemonTypesToLi(pokemon.types).join('')}
                </ol>

                <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
            </div>  
        </li>
    `
}*/

//O objeto pokemon tem uma estrutura muito complexa no API, por isso podemos criar a nossa própria estrutura de dados ==> novo ficheiro .js e nova classe Pokemon
// Fica assim a função convertPokemonToLi(pokemon) mais simples e não é necessário fazer o mapeamento dos tipos de pokemons (convertPokemonTypesToLi(pokemon.types).join('')) porque a classe Pokemon já tem os tipos de pokemons

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>  
            
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>  
        </li>
    `
}



const pokemonList = document.getElementById('pokemonList')  // preferível usar ID do que class pois ID é único e class retorna um array
const loadMoreButton = document.getElementById('loadMoreButton')

/*
fetch(url)
    .then(response => response.json())  // retorna uma promise com o corpo da resposta convertido para JSON
    .then(jsonBody => jsonBody.results) // retorna um array com os pokemons que entra como argumento no próximo then
    .then(pokemons => {
        //console.log(pokemonList)
        for (let i = 0; i < pokemons.length; i++) {
            const pokemon = pokemons[i];
            // console.log(pokemons.name);
            // console.log(convertPokemonToLi(pokemons));
            pokemonList.innerHTML += convertPokemonToLi(pokemon);
            
        }

    })
    .catch(error => console.log(error))
*/

// É importante separar o código do consumo da API do código que manipula o HTML

/* Este método faz com o browser esteja sempre a renderizar o HTML por cada pokemon, o que não é eficiente
pokeApi.getPokemons().then(pokemons => {
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        pokemonList.innerHTML += convertPokemonToLi(pokemon);
        
    }  
}) */ 

// VERSÃO 2 --> criar um array com os pokemons em HTML e depois renderizar o HTML
/*pokeApi.getPokemons().then((pokemons) => {
    const listItems = []
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        listItems.push(convertPokemonToLi(pokemon)); 
    }  
    console.log(listItems);
}) */ // o código acima é mais eficiente do que o anterior

// VERSÃO 3 --> utilizando map para diminuir a verbosidade do código

/*pokeApi.getPokemons().then((pokemons = [] ) => {  // se não houver pokemons, o valor padrão é um array vazio
    
    // const newList = pokemons.map((pokemon) => {
    //     return convertPokemonToLi(pokemon);
    // })

    //const newList = pokemons.map((pokemon) => convertPokemonToLi(pokemon));  // forma mais simplificada de fazer o map
    const newList = pokemons.map(convertPokemonToLi);  // forma ainda mais simplificada de fazer o map

    //console.log(newList);   // Lista de HTML de itens de pokemons

    const newHTML = newList.join('');  // transforma o array em uma string sem separador (string vazia), se tivesse join() sem argumento, o separador seria uma vírgula
    pokemonList.innerHTML += newHTML;  
})*/


// VERSÃO 4 --> versão final simplificada 
/*
pokeApi.getPokemons().then((pokemons = []) => {
    pokemonList.innerHTML = pokemons.map(convertPokemonToLi).join('');  
})*/

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');   
    })
}

const limit = 10;
let offset = 0;
const maxRecords = 151;

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit; 
    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);  // remove o botão (loadMoreButton) da página

    } else {
        loadPokemonItens(offset, limit);
    }
})