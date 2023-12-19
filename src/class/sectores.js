class Sector {
    constructor ({id, sector, subsector}) {
        this.id = id;
        this.sector = sector;
        this.subsector = subsector
    }

     static async getSectores() {
        try {
            let response = await loadedResourses(sheetSectores);
            let dataSectores = arrayToObject(response);
            let sectores = dataSectores.reduce((arr, item) => {
                if(!arr.includes(item.sector)) {arr.push(item.sector)}
                return arr
            },[])
            return sectores
        } catch (e) {console.log(e)}
    }

    static async getSubsectorBySector(sector) {
        let response;
        try {
            response = await loadedResourses(sheetSectores);
        } catch (e) {

        } finally {
            let subsectores = arrayToObject(response);
            subsectores = subsectores.filter(item => item.sector === sector)
            return subsectores
        }
    }
}