const character = document.querySelector('#characterID')
const btnSearch = document.querySelector('.btn-search')
const btnClear = document.querySelector('.btn-clear')
const content = document.querySelector('.content')
const img =  document.querySelector('.character-img')
const container = document.querySelector('#containerResult')

const fetchApi = inputValue => {

    const result =  fetch(`https://rickandmortyapi.com/api/character/${inputValue}`)
    .then(res => res.json()).then(data => data);

    return result
}


const keyCharacter = ['name', 'species', 'gender', 'origin', 'status']

const keysOptions = {
    name: '<strong>Nome</strong>',
    species: '<strong>Espécie</strong>',
    gender: '<strong>Sexo</strong>',
    status: '<strong>Status</strong>',
    origin: '<strong>Planeta de origem</strong>'
}

const searchResult = result => {

    return keyCharacter.map(key => document.getElementById(key))
        .map(element => {
            if(element.checked === true && (Array.isArray(result[element.name])) === true) {

                const arrayResult = result[element.name].join('\r\n')
                console.log(arrayResult)

                const newElement = document.createElement('p')
                newElement.innerHTML = `${keysOptions[element.name]} : ${arrayResult}`
                content.appendChild(newElement)

            } else if(element.checked === true &&  (element.name === 'origin')) {

                const newElement = document.createElement('p')
                newElement.innerHTML = `${keysOptions[element.name]} : ${result[element.name].name}`
                content.appendChild(newElement)

            } else if(element.checked === true && typeof(result[element.name]) !== 'object') {

                const newElement = document.createElement('p')
                newElement.innerHTML = `${keysOptions[element.name]} : ${result[element.name]}`
                content.appendChild(newElement)
            }
        });

}


btnSearch.addEventListener('click', async e => {

    e.preventDefault()

    if(character.value === '') {
        return alert('Digite um valor numérico.')
    }

    const finalResult = await fetchApi(character.value)

    if(content.firstChild === null) {

        container.classList = 'character-container'
        img.src = `${finalResult.image}`
        searchResult(finalResult)

    } else {

        content.innerHTML = ''
        container.classList = 'character-container'
        img.src = `${finalResult.image}`
        searchResult(finalResult)

    }

});


btnClear.addEventListener('click', () => location.reload())