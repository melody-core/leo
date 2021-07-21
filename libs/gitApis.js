const simpleGit = require("simple-git");
const { exec } = require('child_process');
const path = require('path');

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
        git.remote(['add', 'templateupstream', 'https://github.com/melodyWxy/melody-template-store.git'], (err, data)=>{
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
        git.clone('https://github.com/melodyWxy/melody-template-store.git', (err, data)=>{
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