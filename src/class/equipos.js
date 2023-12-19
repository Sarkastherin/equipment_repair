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

    static async getEquipoByCod(codigo) {
        try {
            let response = await loadedResourses(sheetEquipos)
            response = arrayToObject(response)
            let equipo = response.find(item => item.codigo === codigo)
            return equipo
        } catch (e) {

        } 
    }
}