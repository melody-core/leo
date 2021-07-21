#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();
const inquirer = require('inquirer');
const chalk = require('chalk')
const ora = require('ora');
const logList = require('./libs/logList');
// const { rm, deleteRemote, clone } = require('./libs/gitApis');
const storeContrulor = require('./libs/storeContrulor');
const { checkBranch, asyncTemplate } = require('./libs/dowmloadTamplate');
const promptConfig = require('./promptConfig');
const timeoutPromise = require('./libs/timeoutPromise');

// 如果不存在cacheStore，就立即创建它


class Leo {
  async start() {
    // 1 同步远端store更新到本地缓存;
    const spinit = ora('🦁️leo正在检索模板版本，请稍候……');
    spinit.start();
    try {
      const raceRes = await Promise.race([storeContrulor.init(), timeoutPromise(5000)]);
      if(raceRes === 'timeout'){
        spinit.stop();
        console.error('🦁️leo检索模板超时, 建议检查您的网络环境！', );
        return;
      }
      spinit.stop();
      console.log(chalk.green('🦁️leo模板版本检索完毕！'))
    } catch (error) {
      spinit.stop();
      console.error(error)
      console.log(chalk.yellow('🦁️leo检索失败, 建议检查您的网络环境！'));
      // return;
    }
    
    // 2 命令注册
    // version
    program
      .version(require("./package.json").version)
      .option("-v, --version", "查看当前版本");

    // init
    program.command("init")
        .description('初始化一个项目模板')
        .action(async ()=>{
          const spinitTem = ora('🦁️正在初始化模板中……');
          try {
            const branchsData = storeContrulor.current;
            const branchList = logList(branchsData);
            const searchRes = await inquirer.prompt(promptConfig.getSearchListOptions(branchList))
            await checkBranch(branchsData, searchRes.template);
            console.log(`您选择了模板: ${chalk.green(searchRes.template)}`);
            const projectParams = await inquirer.prompt(promptConfig.projectParams)
            spinitTem.start();
            await asyncTemplate(projectParams);
            spinitTem.stop();
            console.log(chalk.green('🦁️初始化模板成功!'))
          }catch (error) {
            spinitTem.stop();
            throw new Error(error);
          }
        })

    // list
    program.command("list")
        .description( "查看所有的项目模板")
        .action(()=>{
          const branchsData = storeContrulor.current;
          logList(branchsData);
        })


    program.parse(process.argv);
  }
}


new Leo().start();
// console.log(1234);
