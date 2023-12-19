const sheetSolicitud = 'Solicitud!A1:H';
const sheetDiagnostico = 'Diagnóstico!A1:E';
const sheetAcción = 'Accion!A1:G';
const sheetEntrega = 'Entrega!A1:D';
const sheetEquipos = 'Equipos!A1:G';
const sheetSectores = 'Sectores!A1:C';
const sheetUsuarios = 'Usuarios!A1:H';

const interface = document.getElementById('interface');
async function loadedResourses(range) {
  let response;
  try {
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    });
    let data = response.result.values
    return data
  } catch (e) {
    console.log(e)
  }
}
async function loadedWindow() {
    try {
      } catch (e) {
        console.log(e)
      } 
}
function arrayToObject(arr) {
  // Obtenemos los encabezados del array
  var headers = arr[0];
  // Creamos un nuevo array para almacenar los objetos transformados
  var newData = [];
  // Iteramos desde 1 para evitar el primer elemento que son los encabezados
  for (var i = 1; i < arr.length; i++) {
    var obj = {};
    // Iteramos a través de cada elemento del array actual
    for (var j = 0; j < headers.length; j++) {
      // Usamos los encabezados como claves y asignamos los valores correspondientes
      obj[headers[j].toLowerCase()] = arr[i][j];
    }
    newData.push(obj); // Agregamos el objeto al nuevo array
  }
  return newData; // Devolvemos el nuevo array de objetos
}

function objectToArray(obj, arr) {
  for (item in obj) {
    if (arr.includes(item)) {
      arr[arr.indexOf(item)] = obj[item]
    }
  }
  return arr
}
async function getHeaders(range) {
  let headers = (await loadedResourses(range))[0].map(item => item.toLocaleLowerCase());
  return headers
}

function getFormatDate(date,withHours) {
  let hour = ''
  let month = date.getMonth() + 1; //obteniendo mes
  let day = date.getDate(); //obteniendo dia
  let year = date.getFullYear(); //obteniendo año
  if (day < 10)
    day = '0' + day; //agrega cero si el menor de 10
  if (month < 10)
    month = '0' + month //agrega cero si el menor de 10
  let newDate = `${day}/${month}/${year}`
  if (withHours) {
    let hours = date.getHours() //obteniendo hora
    let minutes = date.getMinutes(); //obteniendo minutes
    let seconds = date.getSeconds();
    hour = ` ${hours}:${minutes}:${seconds}`
  }
  return newDate+hour
}
async function createId(range) {
  let ids
  try {
      let response = await loadedResourses(range);
      response.shift()
      if(response.length>0) {
        ids = response.map(item => Number(item[0]));
        return Math.max(...ids) + 1
      }
      else { return 1}
  } catch (error) {

  }
}
async function loadPage(srcPage) {
  let response;
  try {
      response = await fetch(srcPage);
      response = await response.text();
      interface.innerHTML = response;
    } catch (e) {
      console.log(e)
    }
}
function loadInputsById(data,isDisabled) {
  for (item in data) {
    const input =document.getElementById(item)
    let testData = !!input;
    if (testData) {
        input.value = data[item];
        if(isDisabled) {input.setAttribute('disabled','')}
        else {input.removeAttribute('disabled','')}
    }
  }
}
