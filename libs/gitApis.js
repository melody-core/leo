const simpleGit = require("simple-git");
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');


// 打个布丁
(()=>{
    const cudirs = fs.readdirSync(path.resolve(__dirname, './../'));
    if(!cudirs.includes('cacheStore')){
        fs.mkdirSync(path.resolve(__dirname, './../cacheStore'))
    }
})()

const git = simpleGit({
    baseDir: path.resolve(__dirname, "./../cacheStore"),
    binary: 'git',
    maxConcurrentProcesses: 6,
})
let temStoreGit = null;

exports.initGit = () => {
    return new Promise((resolve, reject)=>{
        git.init((err, data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data)
            }
        })
    })
}

exports.initTarget = tGit => {
    return new Promise((resolve, reject)=>{
        tGit.init((err, data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data)
            }
        })
    })
}

exports.pull = () => {
    temStoreGit = simpleGit({
        baseDir: path.resolve(__dirname, "./../cacheStore/melody-template-store"),
        binary: 'git',
        maxConcurrentProcesses: 6,
    })
    return new Promise((resolve, reject) => {
        temStoreGit.pull((err, data)=>{
            if(err){
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
                console.log('data:', data);
                let res = data ||'';
                resolve(res.split('\n'));
            }
        });
    })
}

exports.addRemote = () => {
    return new Promise((resolve, reject)=>{
        git.remote(['add', 'templateupstream', 'https://github.com/melody-core/melody-template-store.git'], (err, data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

exports.checkoutTarget = (target, branch) => {
    return new Promise((resolve, reject)=>{
        target.checkout(['-b', branch], (err, data) => {
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

exports.addTargetRemote = (target) => {
    return new Promise((resolve, reject)=>{
        target.remote(['add', 'templateupstream', 'https://github.com/melody-core/melody-template-store.git'], (err, data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

exports.pushTargetRemoteBranch = (target, branch) => {
    return new Promise((resolve, reject)=>{
        target.push("templateupstream", branch, ['-f'], (err, data) => {
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

exports.getTargetRemotes = (target) => {
    return new Promise((resolve, reject)=>{
        target.remote([], (err, data) => {
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}
exports.addTargetUpdate = (target) => {
    return new Promise((resolve, reject)=>{
        target.add(['.'], (err, data) => {
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

exports.CommitTargetUpdate = (target, desc) => {
    return new Promise((resolve, reject)=>{
        target.commit([desc], (err, data) => {
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}


exports.checkout = (params=[]) => {
    return new Promise((resolve, reject) => {
        temStoreGit.checkout(...params, (err, data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

exports.createBranch = (branch) => {
    return new Promise((resolve, reject)=>{
        temStoreGit.branch(branch, (err, data)=>{
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
        temStoreGit.branch(['-a'], (err, data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
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

exports.clone = () => {
    return new Promise((resolve, reject)=>{
        git.clone('https://github.com/melody-core/melody-template-store.git', (err, data)=>{
            if(err){
                reject(err);
            }else{
                temStoreGit = simpleGit({
                    baseDir: path.resolve(__dirname, "./../cacheStore/melody-template-store"),
                    binary: 'git',
                    maxConcurrentProcesses: 6,
                })
                resolve(data);
            }
        })
    })
}