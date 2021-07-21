module.exports = {
    getSearchListOptions: (branchList) => ([{
        type: 'list',
        message: '请选择模板:',
        name: 'template',
        choices: branchList.map(item => item.name),
    }]),
    projectParams: [{
        type: 'input',
        message: '请填写您的项目名称:',
        name: 'projectName',
        prefix: '🦁️',
        default: 'default-project-name'
      ,}, {
          type: 'input',
          message: '请填写项目描述:',
          name: 'desc',
          prefix: '🦁️',
          default: '🦁️: 我好厉害呀！'
      }, {
        type: 'input',
        message: '请填写项目作者名:',
        name: 'author',
        prefix: '🦁️',
        default: ''
    }]
}