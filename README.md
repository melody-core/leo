
# @melody-core/leo

狮子座是旋律之主们基于commander开发的脚手架工具，它的能力来源于它集成的模板。它既可以是独立的命令行工具，也可以作为@melody-core/melody-cli的一个命令行套件。


## 安装 及 使用

```shell
    # 你可以单独安装并使用它
    sudo yarn global add @melody-core/leo
    # use
    leo

    # or 将其作为melody-cli的一个套件, 我们更期望如此。
    melody install @melody-core/leo
    # use
    melody leo

    # 终端log
    Usage: leo [options] [command]

    Options:
    -V, --version   output the version number
    -v, --version   查看当前版本
    -h, --help      display help for command

    Commands:
    init            初始化一个项目模板
    list            查看所有的项目模板

    
```

## 模板集成！
> 如果你想在leo中集成模板，三步即可  1 进入模板仓库申请开发权限，或者使用fork仓库提交MR的方式; 2 开发前请注意阅读下方的模板开发规范！ 

+ 模板仓库
https://github.com/melodyWxy/melody-template-store

+ 模板开发规范
https://github.com/melodyWxy/melody-template-store/blob/master/README.md
