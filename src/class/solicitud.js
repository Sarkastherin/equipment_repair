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

    /* static async create(data) {
        let responsePost;
        try {
            data.id = await createId(sheetSolicitud);
            data.fecha = getFormatDate(false,true);
            const headers = await getHeaders(sheetSolicitud);
            const newSolicitud = new Solicitud(data);
            const newData = objectToArray(newSolicitud, headers);
            responsePost = await postData(sheetSolicitud, newData);
            data.status = responsePost.status
            return data
        } catch (e) {
            console.log(e)
        }
    } */
    /* static async getSolicitudById(id) {
        try {
            let response = await loadedResourses(sheetSolicitud);
            response = arrayToObject(response);
            response = response.find(item => item.id === id)
            return response
        } catch (e) {

        }
    } */
    /* static async hasSolicitud(event) {
        try {
            let id = event.target.value;
            let solicitudList = await loadedResourses(sheetSolicitud);
            solicitudList = arrayToObject(solicitudList);
            let result = solicitudList.some(item => item.id === id)
            return result
        } catch (e) {
            
        }
    } */
    /* static canMadeSolicitud() {
        return hasUser
    }
    static async getSolicitudes() {
        try {
            let response = await loadedResourses(sheetSolicitud);
            let solicitudes = arrayToObject(response)
            return solicitudes
        } catch (e) {
            console.log(e)
        }
    } */
}