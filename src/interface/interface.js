/* Load Inputs */
async function loadSectores() {
    try {
        let sectorNames = await Sector.getSectores();
        let input = document.getElementById('sector');
        input.innerHTML = '<option selected value="">Seleccione una opción</option>'
        sectorNames.map(sector => {
            let option = document.createElement('option');
            let textNode = document.createTextNode(sector);
            option.appendChild(textNode);
            option.value = sector;
            input.appendChild(option)
        })
    } catch (e) {
        console.log(e)
    }
}
async function loadUsuarios() {
    try {
        let userNames = await Usuario.getUsuarios();
        let input = document.getElementById('solicita');
        input.innerHTML = '<option selected value="">Seleccione una opción</option>'
        userNames.map(user => {
            let option = document.createElement('option');
            let textNode = document.createTextNode(user.nombre);
            option.appendChild(textNode);
            option.value = user.alias;
            input.appendChild(option)
        })
    } catch (e) {
        console.log(e)
    }
}
async function loadSubsector(event) {
    try {
        let sector = event.target.value
        let subsectores = await Sector.getSubsectorBySector(sector)
        input = document.getElementById('subsector')

        input.innerHTML = '<option selected value="">Seleccione una opción</option>'
        subsectores.map(subsector => {
            let option = document.createElement('option');
            let textNode = document.createTextNode(subsector.subsector);
            option.appendChild(textNode);
            option.value = subsector.subsector;
            input.appendChild(option)
        })
    } catch (e) {
        console.log(e)
    }

}
async function loadEquipo(event) {
    try {
        let codigo = event.target.value
        let equipo = await Equipo.getEquipoByCod(codigo);
        loadInputsById(equipo, true)
    } catch (e) {
        console.log(e)
    }
}
/* Conditions */
function isEquipo(event) {
    let data;
    let typeEquipo = event.target.value;
    let isEquipo = typeEquipo === 'Equipos y maquinarias' ? true : false;
    if (!isEquipo) {
        data = {codigo_maq: 'N/A', nombre_equipo: 'N/A',}
    }
    else {
        data = {codigo_maq: '',nombre_equipo: '',}
    }
    loadInputsById(data,!isEquipo)
}
/* Validations */
function isValidForm(event, form) {
    if (form.checkValidity()) {
      event.preventDefault()
    }
    form.classList.add('was-validated')
    return form.checkValidity()
  }