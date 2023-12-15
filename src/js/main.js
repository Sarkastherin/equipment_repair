const sheetSolicitud = 'Solicitud!A1:H';
const sheetDiagnostico = 'Diagnóstico!A1:E';
const sheetAcción = 'Accion!A1:G';
const sheetEntrega = 'Entrega!A1:D';
const sheetEquipos = 'Equipos!A1:G';
const sheetSectores = 'Sectores!A1:C';
const sheetUsuarios = 'Usuarios!A1:H';

const interface = document.getElementById('interface');
//const pageSolicitud = document.getElementById('pageSolicitud')


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
      //let x = await createId(sheetSolicitud)
      //console.log(x)
      } catch (e) {
        console.log(e)
      } finally {
        
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
function validated(event, form) {
  if (form.checkValidity()) {
    event.preventDefault()
  }
  form.classList.add('was-validated')
  return form.checkValidity()
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
async function postData(range, data) {
  try {
    let response = await gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: range,
      includeValuesInResponse: true,
      insertDataOption: "INSERT_ROWS",
      responseDateTimeRenderOption: "FORMATTED_STRING",
      responseValueRenderOption: "FORMATTED_VALUE",
      valueInputOption: "USER_ENTERED",
      resource: {
        majorDimension: "ROWS",
        range: "",
        values: [
          data
        ]
      }
    })
  } catch (e) {

  }
}
function getFormatDate(fecha) {
  var mes = fecha.getMonth() + 1; //obteniendo mes
  var dia = fecha.getDate(); //obteniendo dia
  var ano = fecha.getFullYear(); //obteniendo año
  if (dia < 10)
    dia = '0' + dia; //agrega cero si el menor de 10
  if (mes < 10)
    mes = '0' + mes //agrega cero si el menor de 10
  fecha = `${dia}/${mes}/${ano}`
  return fecha
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