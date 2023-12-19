class Usuario {
    constructor({id, nombre, apellido, alias, contrasenna, rol}) {
        this.id = id; 
        this.nombre = nombre; 
        this.apellido = apellido; 
        this.alias = alias; 
        this.contrasenna = contrasenna; 
        this.rol = rol
    }
    static async getUsuarios() {
        let response;
        try {
            response = await loadedResourses(sheetUsuarios);
        } catch {

        } finally {
            response = arrayToObject(response);
            let usuarios = response.map(item => {
                return {nombre: `${item.nombre} ${item.apellido}`, alias: item.alias}
            })
            return usuarios
        }
    }
}