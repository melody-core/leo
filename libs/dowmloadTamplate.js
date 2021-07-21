
const fs = require('fs');
const path = require('path');
const { checkout } = require('./gitApis');

const storePath = path.resolve(__dirname, './../cacheStore/melody-template-store');

exports.checkBranch = async (branchData, templateName) => {
    const { current, all = []} = branchData || {};
    const findItem = all.find( item => item.includes(`template/${templateName}`));
    if(!findItem){
        throw new Error('🦁️: 我今天休息不想工作！');
    }
    if(current !== findItem){
        // 先判断本地是否有这个分支
        const branchItem = all.find(item => item === `template/${templateName}`);
        const params = [];
        if(branchItem){
            params.push(branchItem);
        }else{
            params.push(['-b', `template/${templateName}`, `origin/template/${templateName}`])
        }
        await checkout(params);
    }
    return ;
}


const exists = async(from, to) => {
    const dirs = await fs.promises.readdir(from);
    for(let i in dirs) {
        const item = dirs[i];
        if(item!=='.git'){
            const fileObj = await fs.promises.stat(`${from}/${item}`);
            if(fileObj.isFile()){
                const fileData = await fs.promises.readFile(`${from}/${item}`, 'utf-8'); 
                await fs.promises.writeFile(`${to}/${item}`, fileData, {encoding: 'utf-8'});
            }else{
                await fs.promises.mkdir(`${to}/${item}`);
                await exists(`${from}/${item}`, `${to}/${item}`);
            }
        }
    }
}

exports.asyncTemplate = async (projectParams) => {
    const { projectName, author, desc } = projectParams || {};
    const targetPath = path.resolve(process.cwd(), `./${projectName}`);
    await fs.promises.mkdir(targetPath);
    await exists(storePath, targetPath);
    try {
        // 修改package.json
        const packageJSON = await fs.promises.readFile(`${targetPath}/package.json`, 'utf-8');
        const json = JSON.parse(packageJSON);
        json.name = projectName;
        if(author){
            json.author = author;
        }
        delete json.contributors;
        json.description = desc;
        const jsonstr = JSON.stringify(json, null , 4);
        await fs.promises.writeFile(`${targetPath}/package.json`, jsonstr, {encoding: 'utf-8'});
    } catch (error) {
    }
}







