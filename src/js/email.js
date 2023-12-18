async function sendEmail(data) {
    try {
      const message = "To:"+ data.recipient +"\r\n" +
                      "Subject:"+ data.subject +"\r\n" +
                      "Content-Type: text/html; charset=utf-8\r\n\r\n" +
                      data.body;
      const encodedMessage = btoa(message);
      const response = await gapi.client.gmail.users.messages.send({
        'userId': 'me',
        'resource': {
          'raw': encodedMessage
        }
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  function bodyEmailSolicitud(solicitud,equipo) {
    let body = `
    <h3>Solicitud de reparción</h3>
    <ul>
        <li><strong>Id: </strong> ${solicitud.id}</li>
        <li><strong>Fecha: </strong> ${solicitud.fecha}</li>
        <li><strong>Sector: </strong> ${solicitud.sector}</li>
        <li><strong>Subsector: </strong> ${solicitud.subsector}</li>
        <li><strong>Código máquina: </strong> ${solicitud.cod_maquina}</li>
        <li><strong>Nombre máquina: </strong> ${equipo.descripcion}</li>
        <li><strong>Prioridad: </strong> ${solicitud.prioridad}</li>
        <li><strong>Situación: </strong> ${solicitud.descripcion}.</li>
        <li><strong>Solicita: </strong> ${solicitud.solicita}</li>
  </ul>`
  return body
}