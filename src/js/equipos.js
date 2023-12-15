class Equipo {
    constructor ({id,codigo,descripcion,prioridad,tipo,clasificacion,centro_costo,estado}) {
        this.id = id;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
        this.tipo = tipo;
        this.clasificacion = clasificacion;
        this.centro_costo = centro_costo;
        this.estado = estado
    }

    static async getDataEquipment(codigo) {
        let response;
        try {
            response = await loadedResourses(sheetEquipos)
        } catch {

        } finally {
            response = arrayToObject(response)
            let equipo = response.find(item => item.codigo === codigo)
            /* if(equipo === undefined) {
                equipo = {descripcion: 'El código no existe', prioridad: ''}
            } */
            return equipo
        }
    }
}