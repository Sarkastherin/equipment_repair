const DataForm = {};

async function openSolicitud() {
    try {
        await loadPage('../src/html/solicitud.html');
        await loadSectores();
        await loadUsuarios();    
      } catch (e) {
        console.log(e)
      } 
}

async function saveRegister(event) {
    let form = document.querySelector('form');
    let isValid = isValidForm(event, form);
    if (isValid) {
        let data = document.querySelectorAll('[required]');
        data.forEach(item => {DataForm[item.id] = item.value});
        let dataResponse = await Solicitud.create(DataForm);
        if (dataResponse.status === 200) {
            await loadPage('../src/html/form-success.html');
        }
        /* Send Email */
        let body = getBodySolicitud(dataResponse);
        dataResponse.recipient = 'sgc.gross@gmail.com';
        dataResponse.subject = 'Solicitud de reparción'
        sendEmail(dataResponse,body)
    }
    event.preventDefault()
}