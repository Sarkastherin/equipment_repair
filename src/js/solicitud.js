let inputSector;
let inputSolicita;
let inputSubsector;
let descripcionMaquina;
let inputPrioridad;
let inputCodigo;
let dataForm = {};
let dataEquipo = {};
class Solicitud {
    constructor({id,fecha,sector,subsector,cod_maquina,descripcion,prioridad,solicita}) {
        this.id = id;
        this.fecha = fecha;
        this.sector = sector;
        this.subsector = subsector;
        this.cod_maquina = cod_maquina;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
        this.solicita = solicita;
    }

    static async create(data) {
        try {
            data['fecha'] = getFormatDate(new Date());
            data['id'] = await createId(sheetSolicitud)
            const headers = await getHeaders(sheetSolicitud);
            const newSolicitud = new Solicitud(data);
            const newData = objectToArray(newSolicitud, headers);
            postData(sheetSolicitud, newData);
            let containerMessage = document.querySelector('.send-form-message');
            containerMessage.classList.toggle('display-none')
            let form = document.querySelector('.form-solicitud');
            form.classList.toggle('display-none')
        } catch (e) {

        } 
    }
    static async getSolicitudById(id) {
        try {
            let response = await loadedResourses(sheetSolicitud);
            response = arrayToObject(response);
            response = response.find(item => item.id === id)
            if(response.cod_maquina!='N/A') {
                let equipo = await Equipo.getDataEquipment(response.cod_maquina);
                response['cod_nombre_equipo'] = `${response.cod_maquina}: ${equipo.descripcion}`
            }
            else {response['cod_nombre_equipo'] = `N/A`}
            return response
        } catch (e) {

        }
    }
}
async function loadSolicitud() {
    try {
        await loadPage('../src/solicitud.html')
        loadOptionInSolicitud()        
      } catch (e) {
        console.log(e)
      } 
}
async function loadOptionInSolicitud() {
    let sectores;
    let usuarios;
    inputSector = document.getElementById('sector');
    inputSolicita = document.getElementById('solicita');
    try {
      sectores = await Sector.getSectores();
      usuarios = await Usuario.getUsuarios();
    } catch (e) {
      console.log(e)
    } finally {
        inputSector.innerHTML = '<option selected value="">Seleccione una opción</option>'
        sectores.map(sector => {
          let option = document.createElement('option');
          let textNode = document.createTextNode(sector.nombre);
          option.appendChild(textNode);
          option.value = sector.nombre;
          inputSector.appendChild(option)
        })
        inputSolicita.innerHTML = '<option selected value="">Seleccione una opción</option>'
        usuarios.map(usuario => {
          let option = document.createElement('option');
          let textNode = document.createTextNode(usuario.nombre);
          option.appendChild(textNode);
          option.value = usuario.alias;
          inputSolicita.appendChild(option)
        })
    }
}
async function loadSubsector(event) {
    let sector = event.target.value
    let subsectores = await Sector.getSubsectorBySector(sector)
    inputSubsector = document.getElementById('subsector')

    inputSubsector.innerHTML = '<option selected value="">Seleccione una opción</option>'
    subsectores.map(subsector => {
        let option = document.createElement('option');
        let textNode = document.createTextNode(subsector.subsector);
        option.appendChild(textNode);
        option.value = subsector.subsector;
        inputSubsector.appendChild(option)
    })
}
async function loadDataEquipos(event) {
    let codigo = event.target.value
    dataEquipo = await Equipo.getDataEquipment(codigo);
    descripcionMaquina = document.getElementById('descripcionMaquina');
    inputPrioridad = document.getElementById('prioridad');

    if(dataEquipo === undefined) {
        descripcionMaquina.innerHTML = `<strong class="invalidMessage">El Código no existe</stron>`
        inputPrioridad.value = '';
    }
    else {
        descripcionMaquina.innerHTML = `<strong>Equipo: ${dataEquipo.descripcion}</stron>`
        inputPrioridad.value = dataEquipo.prioridad;
        inputPrioridad.setAttribute('disabled','');
    }
}
async function saveSolicitud(event) {
    let form = document.querySelector('form');
    let valid = validated(event, form);
    if (valid) {
        let data = document.querySelectorAll('.save-solicitud');
        data.forEach(item => {dataForm[item.id] = item.value});
        await Solicitud.create(dataForm);
        if(dataForm.cod_maquina==='N/A') {dataEquipo['descripcion'] = 'N/A'}
        let dataEmail = {
            recipient: 'sgc.gross@gmail.com',
            subject: 'Solicitud de reparción',
            body: bodyEmailSolicitud(dataForm, dataEquipo)
          }
        await sendEmail(dataEmail)
    }
    event.preventDefault()
}
function typeReparacion(event) {
    let tipo = event.target.value;
    inputCodigo = document.getElementById('cod_maquina');
    inputPrioridad = document.getElementById('prioridad');
    if(tipo!== 'Equipos y maquinarias') {
        inputCodigo.value = 'N/A';
        inputCodigo.setAttribute('disabled','');
    }
    else {
        inputCodigo.value = '';
        inputCodigo.removeAttribute('disabled','');
    }
}
