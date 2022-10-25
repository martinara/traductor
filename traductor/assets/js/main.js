//Variables
let translateFrom = document.querySelector('#translate-from');
let translateTo = document.querySelector('#translate-to');
let btnTranslate = document.querySelector('#btn-translate');
let source_language = 'es';
let target_language = 'en';
let outputTranslate = document.querySelector('#output-translate');

//Obtener lenguajes de la API (GET)
const get_url = 'https://text-translator2.p.rapidapi.com/getLanguages'

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'b75dff9a0amshc87daad9d6b5c72p161256jsn5935df39f5bd',
    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
  }
};

fetch(get_url, options)
  .then(response => response.json())
  .then(response => {
    let lenguajes = response.data.languages;
    //Codigo para cargar los selects
    lenguajes.forEach(element => {
      translateFrom.innerHTML += `<option value="${element.code}">${element.name}</option>`;
      translateTo.innerHTML += `<option value="${element.code}">${element.name}</option>`
    });
    //Capturar codigo del lenguaje al hacer clic
    translateFrom.addEventListener('click', ()=>{
      source_language = translateFrom.value;
    });
    translateTo.addEventListener('click', ()=>{
      target_language = translateTo.value;
    });
  })
  .catch(err => console.error(err)
);

//Capturar datos del input para enviarlos al servidor (POST)
btnTranslate.addEventListener('click', () => {

  let inputTranslate = document.querySelector('#input-translate');
  let textToTranslate = inputTranslate.value;

  const encodedParams = new URLSearchParams();
  encodedParams.append("source_language", source_language);
  encodedParams.append("target_language", target_language);
  encodedParams.append("text", textToTranslate);

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'b75dff9a0amshc87daad9d6b5c72p161256jsn5935df39f5bd',
      'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    },
    body: encodedParams
  };

  fetch('https://text-translator2.p.rapidapi.com/translate', options)
    .then(response => response.json())
    .then(response => outputTranslate.value = response.data.translatedText)
    .catch(err => console.error(err));
});




