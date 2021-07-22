

const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const simpleGit = require("simple-git");
const ora = require('ora');
const { 
    initTarget, 
    addTargetRemote, 
    pushTargetRemoteBranch, 
    getTargetRemotes,
    addTargetUpdate,
    CommitTargetUpdate,
    checkoutTarget
 } = require("./gitApis");

const LOGS = {
    a: "🦁️发布分支名称参数不符合规范, 参数形式应该为: xxx-xxx-xxx",
    b: "🦁️远端已存在此分支名称的模板, 确认覆盖吗？",
    c: "🦁️已取消此操作。"
}

const checkBranch = (branch = '', branchsData) => {
    if(!branch){
        return "a";
    }
    if(branch[0] === '.'){
        return 'a';
    }
    const { all = [] } = branchsData || {};
    const list = all.map((item = '')=>{
        return item.replace('remotes/origin/template/', '');
    })
    if(list.includes(branch)){
        return "b";
    }
}


module.exports = async(branch, propath, branchsData) => {
    const checkRes = checkBranch(branch, branchsData);
    if(checkRes === "a"){
        console.log(chalk.yellow(LOGS["a"]));
        return;
    }
    if(checkRes === "b"){
        const inqRes = await inquirer.prompt([{
            type: "confirm",
            name: "enterUpdate",
            message: LOGS["b"]
        }])
        if(!inqRes.enterUpdate){
            console.log(chalk.yellow(LOGS['c']))
            return ; 
        }
    }

    const targetPath = !propath ? process.cwd() : path.resolve(process.cwd(),  propath);
    // 判断是否init过了，如果有，添加remote=>发布；
    // 如果没有，init => 添加remote =>发布
    let checkInitGit;
    let checkGitNo;
    let dirs;
    
    try {
        dirs = await fs.promises.readdir(targetPath);
        checkInitGit = dirs.includes(".git");
        checkGitNo = dirs.includes(".gitignore");
    } catch (error) {
        console.error("🦁️您填写的路径参数不是一个目录路径，填写相对路径即可，例如: './test-pro-dir'");
        process.exit();
    }
    const tGit = simpleGit({
        baseDir: targetPath,
        binary: 'git',
        maxConcurrentProcesses: 6,
    })
    const spinit = ora('🦁️leo正在传输模板到仓库，请稍候……');
    try {
        if(!checkInitGit){
            await initTarget(tGit);
            if(!checkGitNo){
                await fs.promises.writeFile(`${targetPath}/.gitignore`, "node_modules", {encoding: "utf-8"})
            }
        }
        const remotes = await getTargetRemotes(tGit);
        const remoteList = (remotes || '').split('\n');
        if(!remoteList.includes('templateupstream')){
            await addTargetRemote(tGit);
        }
        console.log(111);
        await addTargetUpdate(tGit);
        const iqdata = await inquirer.prompt([{
            type: 'input',
            message: "🦁️请给您的模板添加一个描述",
            name: 'desc'
        }]) ;
        process.exit();
        spinit.start();
        await CommitTargetUpdate(tGit, iqdata.desc);
        const idBranch = ''+Date.now(); 
        await checkoutTarget(tGit, idBranch);
        await pushTargetRemoteBranch(tGit, `${idBranch}:${branch}`);
    } catch (error) {
        spinit.stop();
        console.error(error);
        console.log(chalk.yellow("🦁️发布失败了,请查看报错，如果是没有权限，请联系 @六弦 为您添加权限。"));
        return ;
    }
    spinit.stop();
    console.log(chalk.green("🦁️传输成功！"))
}