
const { pull, initGit, addRemote, clone, getBranchs  } = require('./gitApis')

class StoreContrulor{
    constructor(){
        this.current = {};
    }
    async init(){
        try {
            await pull();
        } catch (error) {
            await initGit();
            await clone();
        }
        const remoteList = await getBranchs();
        this.current = remoteList;
        return remoteList;
    }

}


module.exports = new StoreContrulor()