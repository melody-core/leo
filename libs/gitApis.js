const simpleGit = require("simple-git");
const { exec } = require('child_process');
const path = require('path');

const git = simpleGit({
    baseDir: path.resolve(__dirname, "./../cacheStore"),
    binary: 'git',
    maxConcurrentProcesses: 6,
})


exports.initGit = () => {
    return new Promise((resolve, reject)=>{
        git.init((err, data)=>{
            if(err){
                reject(err);
            }else{
                console.log(data);
                resolve(data)
            }
        })
    })
}

exports.pull = () => {
    return new Promise((resolve, reject) => {
        git.pull((err, data)=>{
            if(err){
                console.log('pull-err:', err);
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

exports.rm = () => {
    return new Promise((resolve, reject)=>{
        exec(`rm -rf ./.git`, {
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

exports.getRemoteList = () => {
    return new Promise((resolve, reject)=>{
        git.remote((err, data)=>{
            if(err){
                reject(err);
            }else{
                let res = data ||'';
                resolve(res.split('\n'));
            }
        });
    })
}

exports.addRemote = () => {
    return new Promise((resolve, reject)=>{
        git.remote(['add', 'templateupstream', 'https://github.com/melodyWxy/melody-template-store.git'], (err, data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

exports.fetchRemote = () => {
    return new Promise((resolve, reject)=>{
        git.fetch(['templateupstream'], (err, data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

exports.getBranchs = () => {
    return new Promise((resolve, reject)=>{
        git.remote(['show', 'templateupstream'], (err, data)=>{
            if(err){
                reject(err);
            }else{
                
                const stringList = (data||'').split('\n');
                const branchs = stringList.filter(item => item.includes('tracked'));
                const res = branchs.map((item)=>{
                    return item.replace('tracked', '').trim();
                })
                    .filter(item=>item.includes('template'))
                    .map(item => item.replace('template/', ''))

                resolve(res);
            }
        })
    })
}

exports.deleteRemote =  () => {
    return new Promise((resolve, reject)=>{
        git.remote(['remove', 'templateupstream'], (err, data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

exports.clone = (branch) => {
    return new Promise((resolve)=>{
        git.clone('https://github.com/melodyWxy/melody-template-store.git', ['-b', `template/${branch}`], (err, data)=>{
            if(err){
                throw err;
            }else{
                const git = simpleGit({
                    baseDir: `${process.cwd()}/melody-template-store`,
                    binary: 'git',
                    maxConcurrentProcesses: 6,
                })
                git.remote(['remove', 'origin'], (err, res)=>{
                    if(err){
                        throw err;
                    }else{
                        resolve(res);
                    }
                })
            }
        })
    })
}