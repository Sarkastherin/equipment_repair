const DataFormEquipo = {};
let codigo;

async function openEquipo(event) {
    try {
        if (await Usuario.isAdmi()){
            activeLinks(event)
            await loadPage('../src/html/equipos.html');
            listenerChangeEvent() 
        }
        else {
            await loadMessageDenied()
        }
      } catch (e) {
        console.log(e)
      }
}

function initilizeForAction(event) {
    
    codigo =document.getElementById('codigo')
    let action = event.target.id;
    let btnSubmit = document.getElementById('btnSubmit');
    if(action === 'optionAdd') {
        codigo.setAttribute('onchange', 'canUseCodigo(event)');
        btnSubmit.setAttribute('onclick', 'saveEquipo(event)')
    }
    else {
        codigo.setAttribute('onchange', 'getEquipo(event)');
        btnSubmit.setAttribute('onclick', 'updateEquipo(event)')
    }
    let abled = document.querySelectorAll('.save-equipo');
    abled.forEach(item => item.value = '') 
}

async function canUseCodigo(event) {
    try {
        let abled = document.querySelectorAll('[required]');
        codigo = event.target.value;
        let isValidCodigo = await Equipo.isValidCodigo(codigo);
        if(isValidCodigo) {
            abled.forEach(item => item.removeAttribute('disabled'))
        }
        else {
            console.log('Código ya existe')
            abled.forEach(item => item.setAttribute('disabled',''))
            document.getElementById('codigo').removeAttribute('disabled')
        }
        console.log(isValidCodigo)
    } catch (e) {
        console.log(e)
    }
}

async function getEquipo(event) {
    try {
        codigo = event.target.value;
        let canEdit = !await Equipo.isValidCodigo(codigo);
        if(canEdit) {loadEquipo(event, false)}
        await Equipo.getEquipoByCod(codigo);
    } catch (e) {
        console.log(e)
    }
}

async function saveEquipo(event) {
    let form = document.querySelector('form');
    let isValid = isValidForm(event, form);
    if (isValid) {
        let data = document.querySelectorAll('.save-equipo');
        data.forEach(item => {DataFormEquipo[item.id] = item.value});
        let dataResponse = await Equipo.create(DataFormEquipo);
        if (dataResponse.status === 200) {
            await loadPage('../src/html/register-success.html');
        }
    }
    event.preventDefault()
}

async function updateEquipo(event) {
    let form = document.querySelector('form');
    let isValid = isValidForm(event, form);
    if (isValid) {
        let data = document.querySelectorAll('.change-save');
        data.forEach(item => {DataFormEquipo[item.id] = item.value});
        if(Object.keys(DataFormEquipo).length === 0) {
            modalShow('')
            alert('nada para actualizar')
        }
        else {
           let response = await Equipo.update(codigo,DataFormEquipo);
            if (response === 200) {
                await loadPage('../src/html/register-success.html');
            } 
        }
    }
    event.preventDefault()
}