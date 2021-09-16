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
            await pull();
        } catch (error) {
            try {
                await removeCacheDir();
            } catch (__error) {}
            await initGit();
            await clone();
        }
        let remoteList;
        try {
            remoteList = await getBranchs();
        } catch (error) {
            await removeCacheDir();
            console.warning('🦁️ 狮子刚修复了一个小bug，请重新此命令。')
        }
        this.current = remoteList;
        return remoteList;
    }
}


module.exports = new StoreContrulor()