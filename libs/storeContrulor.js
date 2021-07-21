
const { pull, initGit, addRemote, clone, getBranchs  } = require('./gitApis')

class StoreContrulor{
    constructor(){
        this.current = {};
    }
    async init(){
        try {
            await pull();
        } catch (error) {
            console.log(1);
            await initGit();
            console.log(2);
            await clone();
            console.log(3);
        }
        const remoteList = await getBranchs();
        this.current = remoteList;
        return remoteList;
    }

}


module.exports = new StoreContrulor()