class Diagnostico {
    constructor({id, id_solicitud, fecha, diagnostico, atiende}) {
        this.id = id;
        this.id_solicitud = id_solicitud;
        this.fecha = fecha;
        this.diagnostico = diagnostico;
        this.atiende = atiende
    }
    static async create(data) {
        let responsePost;
        try {
            data.id = await createId(sheetDiagnostico);
            data.fecha = getFormatDate(false,true);
            const headers = await getHeaders(sheetDiagnostico);
            const newDiagnostico = new Diagnostico(data);
            console.log(newDiagnostico)
            const newData = objectToArray(newDiagnostico, headers);
            console.log(newData)
            responsePost = await postData(sheetDiagnostico, newData);
            data.status = responsePost.status
            return data
        } catch (e) {
            console.log(e)
        }
    }
    static async hasDiagnostico(event) {
        try {
            let id = event.target.value;
            let diagnosticList = await loadedResourses(sheetDiagnostico);
            diagnosticList = arrayToObject(diagnosticList);
            let result = diagnosticList.some(item => item.id_solicitud === id)
            return result
        } catch (e) {
            
        }
    }
    static async getDiagnosticoById(id) {
        try {
            let response = await loadedResourses(sheetDiagnostico);
            response = arrayToObject(response);
            response = response.find(item => item.id_solicitud === id)
            return response
        } catch (e) {

        }
    }
    static canMadeDiagnostico() {
        return hasUser && (usuario.rol == 'Usuario B' || usuario.rol == 'Administrador')
    }
}