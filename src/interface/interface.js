/* Load Inputs */
async function loadEquipos() {
    try {
        let equiposList = await Equipo.getEquipos();
        let input = document.getElementById('codigo_maqOptions');
        input.innerHTML = '<option selected value="">Seleccione una opción</option>';
        equiposList.map(item => {
            let option = document.createElement('option');
            let textNode = document.createTextNode(item.nombre_equipo);
            option.appendChild(textNode);
            option.value = item.codigo;
            input.appendChild(option)
        })
    } catch (e) {
        console.log(e)
    }
}
async function loadSectores() {
    try {
        let sectorNames = await Sector.getSectores();
        let input = document.getElementById('sector');
        input.innerHTML = '<option selected value="">Seleccione una opción</option>'
        sectorNames.map(item => {
            let option = document.createElement('option');
            let textNode = document.createTextNode(item.sector);
            option.appendChild(textNode);
            option.value = item.id;
            input.appendChild(option)
        })
    } catch (e) {
        console.log(e)
    }
}
async function loadUsuarios(idInput) {
    try {
        let userNames = await Usuario.getUsuarios();
        let input = document.getElementById(idInput);
        input.innerHTML = '<option selected value="">Seleccione una opción</option>'
        userNames.map(user => {
            let option = document.createElement('option');
            let textNode = document.createTextNode(user.nombreCompleto);
            option.appendChild(textNode);
            option.value = user.alias;
            input.appendChild(option)
        })
        input.value = usuario.alias
    } catch (e) {
        console.log(e)
    }
}
async function loadSubsector(event) {
    try {
        let id_sector = event.target.value
        let subsectores = await Subsector.getSubsector(id_sector)
        input = document.getElementById('subsector')

        input.innerHTML = '<option selected value="">Seleccione una opción</option>'
        subsectores.map(subsector => {
            let option = document.createElement('option');
            let textNode = document.createTextNode(subsector.subsector);
            option.appendChild(textNode);
            option.value = subsector.id;
            input.appendChild(option)
        })
    } catch (e) {
        console.log(e)
    }

}
async function loadSubsectorList() {
    try {
        let subsectores = await Subsector.getSubsectores()
        input = document.getElementById('subsector')

        input.innerHTML = '<option selected value="">Seleccione una opción</option>'
        subsectores.map(item => {
            let option = document.createElement('option');
            let textNode = document.createTextNode(item.subsector);
            option.appendChild(textNode);
            option.value = item.id;
            input.appendChild(option)
        })
    } catch (e) {
        console.log(e)
    }
}
async function loadEquipo(event,isDisabled = true) {
    try {
        let codigo = event.target.value
        let equipo = await Equipo.getEquipoByCod(codigo);
        loadInputsById(equipo, isDisabled)
    } catch (e) {
        console.log(e)
    }
}
async function loadUsuario(event,isDisabled = true) {
    try {
        let email = event.target.value
        let usuario = await Usuario.getUserByEmail(email)//Equipo.getEquipoByCod(codigo);
        loadInputsById(usuario, isDisabled)
    } catch (e) {
        console.log(e)
    }
}
async function loadSolicitud(event) {
    try {
        let id = event.target.value;
        let solicitud = await Solicitud.getSolicitudById(id);
        let equipo = await Equipo.getEquipoByCod(solicitud.codigo_maq);
        solicitud['nombre_equipo'] = equipo.nombre_equipo;
        loadInputsById(solicitud,true);
    } catch (e) {
        console.log(e)
    }
}
async function loadDiagnostico(event) {
    try {
        let id = event.target.value;
        let diagnostico = await Diagnostico.getDiagnosticoById(id);
        loadInputsById(diagnostico,true)
    } catch (e) {
        console.log(e)
    }
}
function modalShow(titulo,body){
    var myModalShow = new bootstrap.Modal(document.getElementById('myModalMessage'));
    var titleModal = document.querySelector(`#myModalMessage .modal-title`);
    titleModal.innerText = titulo
    var bodyModal = document.querySelector(`#myModalMessage .modal-body`);
    bodyModal.innerText = body
    myModalShow.show();
  }
  function modalHide() {
    var modalElement = document.getElementById('myModalMessage');
  var modal = bootstrap.Modal.getInstance(modalElement); // Obtener la instancia del modal
  if(modal) {
    modal.hide(); // Ocultar el modal si existe una instancia
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
async function loadMessageDenied() {
    try {
       await loadPage('./html/deniedPermission.html');
      let userList = await Usuario.getUsuarios();
      let ul = document.createElement('ul');
      let admList = userList.filter(item => item.rol === 'Administrador')
      admList.map(item => {
        let li = document.createElement('li');
        let text = document.createTextNode(item.nombreCompleto)
        li.appendChild(text)
        ul.appendChild(li);
        interface.appendChild(ul)
      }) 
    } catch (e) {
        console.log(e)
    }
}
/* Validations */
function isValidForm(event, form) {
    if (form.checkValidity()) {
      event.preventDefault()
    }
    form.classList.add('was-validated')
    return form.checkValidity()
}
function activeLinks(event) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('nav-link-active'))
    event.target.classList.add('nav-link-active');
}
