class Sector {
    constructor ({id, sector, subsector}) {
        this.id = id;
        this.sector = sector;
        this.subsector = subsector
    }

     static async getSectores() {
        let response;
        try {
            response = await loadedResourses(sheetSectores)
        } catch (e) {
            console.log(e)

        } finally {
            response = arrayToObject(response);
            let sectores = response.reduce((arr, item) => {
                if(!arr.includes(item.sector)) {
                    arr.push(item.sector)
                }
                return arr
            },[])
            sectores = sectores.map(item => {return {nombre: item}})
            return sectores
        }
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