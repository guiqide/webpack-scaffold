# webpack脚手架
webpack的配置总所周知非常复杂，做这个是为了让webpack可以开箱即用，并且可以直接上线

## 多入口

如果需要设置其他页面，build/webpack.common.js中的entry添加新的多页面  
需要将src/app添加目录、并配置文件
```
entry: {
    foo: addEntry('foo')
}
```