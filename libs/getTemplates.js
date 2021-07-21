
const {  rm, initGit, getRemoteList, getBranchs, addRemote, fetchRemote } = require('./gitApis');

async function getTemplates(){
    let remoteList;
    try {
        remoteList  = await getRemoteList();
    } catch (error) {
        await initGit();
        remoteList  = await getRemoteList();
    }
    if(!remoteList){
        console.error('请检测您是否安装了git。')
    }
    
    if(!remoteList.includes('templateupstream')){
        await addRemote();
    }
    await fetchRemote();
    const res = await getBranchs();
    return res;
}


module.exports = getTemplates;
