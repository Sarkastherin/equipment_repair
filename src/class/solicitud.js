class Solicitud {
    constructor({ id, fecha,sector, subsector, codigo_maq, situacion, prioridad, solicita }) {
        this.id = id;
        this.fecha = fecha;
        this.sector = sector;
        this.subsector = subsector;
        this.codigo_maq = codigo_maq;
        this.situacion = situacion;
        this.prioridad = prioridad;
        this.solicita = solicita;
    }

    static async create(data) {
        let responsePost;
        try {
            data.id = await createId(sheetSolicitud);
            data.fecha = getFormatDate(new Date(),true);
            const headers = await getHeaders(sheetSolicitud);
            const newSolicitud = new Solicitud(data);
            const newData = objectToArray(newSolicitud, headers);
            responsePost = await postData(sheetSolicitud, newData);
            data.status = responsePost.status
            return data
        } catch (e) {
            console.log(e)
        }
    }
    static async getSolicitudById(id) {
        try {
            let response = await loadedResourses(sheetSolicitud);
            response = arrayToObject(response);
            response = response.find(item => item.id === id)
            if(response.cod_maquina!='N/A') {
                let equipo = await Equipo.getDataEquipment(response.cod_maquina);
                response['cod_nombre_equipo'] = `${response.cod_maquina}: ${equipo.descripcion}`
            }
            else {response['cod_nombre_equipo'] = `N/A`}
            return response
        } catch (e) {

        }
    }
}