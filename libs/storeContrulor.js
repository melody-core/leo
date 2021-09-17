const path = require('path');
const { exec } = require('child_process');
const { pull, initGit, addRemote, clone, getBranchs  } = require('./gitApis')


const removeCacheDir = ( ) => {
    const targetPath = path.resolve(__dirname, './../cacheStore');
    return new Promise((resolve, reject)=>{
        exec(`rm -rf ${targetPath}/melody-template-store`, {
            cwd: process.cwd()
        },(err, stidio)=>{
            if(err){
                reject(err)
            }else{
                resolve(stidio)
            }
        })
    })
}
class StoreContrulor{
    constructor(){
        this.current = {};
    }
    async init(){
        try {
            try {
                await pull();
            } catch (error) {
                await initGit();
                await clone();
            }
            const remoteList = await getBranchs();
            this.current = remoteList;
            return remoteList;
        } catch (_error) {
            await removeCacheDir();
            console.warning('🦁️ 狮子刚更新了模板，请重新执行命令启动狮子!')
        }

    }
}


module.exports = new StoreContrulor()