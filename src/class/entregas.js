class Entrega {
    constructor({id, id_solicitud, fecha, responsable_entrega}) {
        this.id = id;
        this.id_solicitud = id_solicitud;
        this.fecha = fecha;
        this.responsable_entrega = responsable_entrega;
    }
    static async create(data) {
        let responsePost;
        try {
            data.id = await createId(sheetEntrega);
            data.fecha = getFormatDate(false,true);
            const headers = await getHeaders(sheetEntrega);
            const newEntrega = new Entrega(data);
            const newData = objectToArray(newEntrega, headers);
            responsePost = await postData(sheetEntrega, newData);
            data.status = responsePost.status
            return data
        } catch (e) {
            console.log(e)
        }
    }
    static async hasEntrega(event) {
        try {
            let id = event.target.value;
            let entregaList = await loadedResourses(sheetEntrega);
            entregaList = arrayToObject(entregaList);
            let result = entregaList.some(item => item.id_solicitud === id)
            return result
        } catch (e) {
            
        }
    }
    static canMadeEntrega() {
        return hasUser && (usuario.rol == 'Usuario C' || usuario.rol == 'Administrador')
    }
}