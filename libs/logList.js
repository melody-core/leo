

const prefix = 'remotes/origin/template/';

module.exports = function(branchResult = {}){
    const {branches = {}} = branchResult;
    let list = [];
    for(let i in branches){
        const { name, label } = branches[i] || {};
        if(name.includes(prefix)){
            list.push({
                name: name.replace(prefix, ''),
                desc: label,
                '模板名称(name)': name.replace(prefix, ''),
                '模板描述(desc)': label 
            })
        }
    }
    console.log();
    console.table(list, ['模板名称(name)', '模板描述(desc)']);
    return list;
}