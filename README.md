
# @melody-core/leo

狮子座是旋律之主们基于commander开发的脚手架工具，它的能力来源于它集成的模板。它既可以是独立的命令行工具，也可以作为@melody-core/melody-cli的一个命令行套件。


## 安装 及 使用

```shell
    # 你可以单独安装并使用它
    yarn global add @melody-core/leo
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
    init                            初始化一个项目模板
    list                            查看所有的项目模板
    publish <templateName> [path]   发布一个模板到模板仓库
    
```

## 模板集成！
> 现在，如果你想集成一个模板，只需要运行一个命令即可一键发布

```shell
    # 例如: 你想把当前路径所在的一个项目(比如叫react-test-app)，发布成一个叫react-template的模板
    # /react-test-app 项目的根目录下
     # 运行publish命令，后面跟着的是你对模板的命名
    leo publish react-template 
    
    # 如果你不在模板项目目录下，你可以通过path参数——相对路径来指定将某个项目发布成模板。
    # path参数默认为 ./ 即当前路径。
    leo publish react-template ./react-test-app
```
