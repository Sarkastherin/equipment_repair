async function loadDiagnostico() {
    try {
        await loadPage('../src/diagnostico.html')     
      } catch (e) {
        console.log(e)
      } 
}
async function getSolicitud(event) {
    let id = event.target.value;
    let solicitud;
    try {
        solicitud = await Solicitud.getSolicitudById(id);
        loadInputsById(solicitud)
        document.querySelector('.container-diagnostico').classList.toggle('display-none')
    } catch(e) {
        console.log(e)
    }
}