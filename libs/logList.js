


module.exports = function(list = []){
    console.log();
    const res =  list.map(item=>({
        template: item
    }))
    console.table(res, ['template'])
}