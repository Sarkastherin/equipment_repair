class Subsector {
    constructor ({id, id_sector, subsector}) {
        this.id = id;
        this.id_sector = id_sector;
        this.subsector = subsector
    }
    static async getSubsector(id) {
        let response;
        try {
            response = await loadedResourses(sheetSubsectores);
        } catch (e) {

        } finally {
            let subsectores = arrayToObject(response);
            subsectores = subsectores.filter(item => item.id_sector === id)
            return subsectores
        }
    }
    static async getSubsectores() {
        let response;
        try {
            response = await loadedResourses(sheetSubsectores);
        } catch (e) {

        } finally {
            let subsectores = arrayToObject(response);
            //subsectores = subsectores.map(item => item.subsector)
            return subsectores
        }
    }
}