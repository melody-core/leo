const path = require('path')
const simpleGit = require('simple-git');

const storeGit = simpleGit({
    baseDir: path.resolve(__dirname, "./../cacheStore"),
    binary: 'git',
    maxConcurrentProcesses: 6,
})


class StoreContrulor{
    async init(){
        // 如果已经存在仓库，就直接更新仓库，否则先初始化仓库，再拉取仓库;
        try {
            remoteList  = await getRemoteList();
        } catch (error) {
            await initGit();
            remoteList  = await getRemoteList();
        }
        // 同步远端store内容
           
    }

}


module.exports = new StoreContrulor()