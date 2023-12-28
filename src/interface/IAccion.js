const DataFormAccion = {};

async function openAccion(event) {
    try {
        if(Diagnostico.canMadeDiagnostico()) {
            activeLinks(event)
            await loadPage('../src/html/accion.html');
            await loadSectores();
            await loadSubsectorList();
            await loadUsuarios('responsable');
        }
        else {
            await loadMessageDenied()
        }
    } catch (e) {
        console.log(e)
    }
}
async function initializeFormAccion(event) {
    try {
        const hasSolicitud = await Solicitud.hasSolicitud(event,false)
        const hasDiagnostico = await Diagnostico.hasDiagnostico(event, false)
        const hasAccion = await Accion.hasAccion(event, false)
        if (!hasSolicitud) {
            console.log('Solicitud de reparación no existe')
        }
        else if (hasSolicitud && !hasDiagnostico) {
            console.log('Solicitud de reparación sin diagnóstico')
        }
        else if (hasSolicitud && hasDiagnostico && hasAccion) {
            console.log('Solicitud de reparación cerrada')
        }
        else if (hasSolicitud && hasDiagnostico && !hasAccion) {
            await loadSolicitud(event);
            await loadDiagnostico(event)
            let accionForm = document.getElementById('accionForm');
            accionForm.classList.remove('display-none')
        }
        let id_solicitud = document.getElementById('id_solicitud')
        id_solicitud.removeAttribute('disabled', '')
        //await loadUsuarios('responsable')

    } catch (e) {
        console.log(e)
    }
}
async function saveAccion(event) {
    let form = document.querySelector('form');
    let isValid = isValidForm(event, form);
    console.log(isValid)
    if (isValid) {
        let data = document.querySelectorAll('[required]');
        data.forEach(item => { DataFormAccion[item.id] = item.value });
        let dataResponse = await Accion.create(DataFormAccion);
        if (dataResponse.status === 200) {
            await loadPage('../src/html/form-success.html');
            let body = getBodyAccion(dataResponse);
            dataResponse.recipient = 'sgc.gross@gmail.com';
            dataResponse.subject = 'Accones tomadas en reparación'
            sendEmail(dataResponse, body)
        }
    }
    event.preventDefault()
}