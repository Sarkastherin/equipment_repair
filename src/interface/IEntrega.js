const DataFormEntrega = {};

async function openEntrega(event) {
    activeLinks(event)
    try {
        if(Entrega.canMadeEntrega()) {
            await loadPage('../src/html/entrega.html');  
            await loadSectores();
            await loadSubsectorList();
            await loadUsuarios('responsable_entrega'); 
        }
        else {
            console.log('Usted no tiene los permisos requeridos')
        }
      } catch (e) {
        console.log(e)
      }
}
async function initializeFormEntrega(event) {
    try {
        const hasSolicitud = await Solicitud.hasSolicitud(event)
        const hasDiagnostico = await Diagnostico.hasDiagnostico(event)
        const hasAccion = await Accion.hasAccion(event)
        const hasEntrega = await Entrega.hasEntrega(event)
        if (!hasSolicitud) {
            console.log('Solicitud de reparación no existe')
        }
        else if (hasSolicitud && !hasAccion) {
            console.log('Solicitud de reparación no está cerrada')
        }
        else if (hasEntrega) {
            console.log('El equipo ya ha sido entregado')
        }
        else if (hasSolicitud && hasDiagnostico && hasAccion) {
            await loadSolicitud(event);
            let entregaForm = document.getElementById('entregaForm');
            entregaForm.classList.remove('display-none')
        }
        let id_solicitud = document.getElementById('id_solicitud')
        id_solicitud.removeAttribute('disabled' , '')
        
    } catch (e) {
        console.log(e)
    }
}
async function saveEntrega(event) {
    let form = document.querySelector('form');
    let isValid = isValidForm(event, form);
    console.log(isValid)
    if (isValid) {
        let data = document.querySelectorAll('[required]');
        data.forEach(item => {DataFormEntrega[item.id] = item.value});
        let dataResponse = await Entrega.create(DataFormEntrega);
        if (dataResponse.status === 200) {
            await loadPage('../src/html/form-success.html');
            /* Send Email */
            let body = getBodyEntrega(dataResponse);
            dataResponse.recipient = 'sgc.gross@gmail.com';
            dataResponse.subject = 'Entrega de equipo'
            sendEmail(dataResponse,body)
        }
    }
    event.preventDefault()
}