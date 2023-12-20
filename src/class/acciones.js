class Accion {
    constructor({id, id_solicitud, fecha, accion, responsable, horas_hombre, fecha_entrega_pannol}) {
        this.id = id;
        this.id_solicitud = id_solicitud;
        this.fecha = fecha;
        this.accion = accion;
        this.responsable = responsable;
        this.horas_hombre = horas_hombre;
        this.fecha_entrega_pannol = getFormatDate(fecha_entrega_pannol,false);
    }
    static async create(data) {
        let responsePost;
        try {
            data.id = await createId(sheetAccion);
            data.fecha = getFormatDate(false,true);
            const headers = await getHeaders(sheetAccion);
            const newAccion = new Accion(data);
            const newData = objectToArray(newAccion, headers);
            responsePost = await postData(sheetAccion, newData);
            data.status = responsePost.status
            return data
        } catch (e) {
            console.log(e)
        }
    }
    static async hasAccion(event) {
        try {
            let id = event.target.value;
            let accionList = await loadedResourses(sheetAccion);
            accionList = arrayToObject(accionList);
            let result = accionList.some(item => item.id_solicitud === id)
            return result
        } catch (e) {
            
        }
    }
}