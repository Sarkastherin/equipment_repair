const DataFormDiagnostico = {};

async function openDiagnostico(event) {
    activeLinks(event)
    try {
        await loadPage('../src/html/diagnostico.html');
        await loadSectores();
        await loadSubsectorList();
        await loadUsuarios('atiende'); 
      } catch (e) {
        console.log(e)
      }
}
async function initializeForm(event) {
    try {
        const hasSolicitud = await Solicitud.hasSolicitud(event)
        const hasDiagnostico = await Diagnostico.hasDiagnostico(event)
        if (!hasSolicitud) {
            console.log('Solicitud de reparación no existe')
        }
        else if (hasSolicitud && hasDiagnostico) {
            console.log('Solicitud de reparación ya tiene diagnostico')
        }
        else if (hasSolicitud && !hasDiagnostico) {
            await loadSolicitud(event);
            let diagnosticForm = document.getElementById('diagnosticForm');
            diagnosticForm.classList.remove('display-none')
        }
        //await loadUsuarios('atiende')
        
    } catch (e) {
        console.log(e)
    }
}
async function saveDiagnostic(event) {
    let form = document.querySelector('form');
    let isValid = isValidForm(event, form);
    if (isValid) { 
        let data = document.querySelectorAll('[required]');
        data.forEach(item => {DataFormDiagnostico[item.id] = item.value});
        let dataResponse = await Diagnostico.create(DataFormDiagnostico);
        if (dataResponse.status === 200) {
            await loadPage('../src/html/form-success.html');
            let body = getBodyDiagnostico(dataResponse);
            dataResponse.recipient = 'sgc.gross@gmail.com';
            dataResponse.subject = 'Diagnóstico de reparción'
            sendEmail(dataResponse,body)
        }
    }
    event.preventDefault()
}