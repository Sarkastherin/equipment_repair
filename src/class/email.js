async function sendEmail(data,body) {
    try {
      const message = "To:"+ data.recipient +"\r\n" +
                      "Subject:"+ data.subject +"\r\n" +
                      "Content-Type: text/html; charset=utf-8\r\n\r\n" +
                      body;
      const encodedMessage = btoa(message);
      const response = await gapi.client.gmail.users.messages.send({
        'userId': 'me',
        'resource': {
          'raw': encodedMessage
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  function getBodySolicitud(data) {
    let body = `
    <h3>Solicitud de reparación</h3>
    <ul>
        <li><strong>Id: </strong> ${data.id}</li>
        <li><strong>Fecha: </strong> ${data.fecha}</li>
        <li><strong>Sector: </strong> ${data.sector}</li>
        <li><strong>Subsector: </strong> ${data.subsector}</li>
        <li><strong>Código máquina: </strong> ${data.codigo_maq}</li>
        <li><strong>Nombre máquina: </strong> ${data.nombre_equipo}</li>
        <li><strong>Prioridad: </strong> ${data.prioridad}</li>
        <li><strong>Situación: </strong> ${data.situacion}.</li>
        <li><strong>Solicita: </strong> ${data.solicita}</li>
    </ul>`
  return body
}