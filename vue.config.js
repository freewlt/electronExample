module.exports = {
    // pluginOptions: {
    //     electronBuilder: {
    //         builderOptions: {
    //             "productName": "test1",//项目名，也是生成的安装文件名，即aDemo.exe
    //             "copyright": "Copyright © 2022",//版权信息
    //             "win": {
    //                 "icon": "./public/favicon.ico"//这里注意配好图标路径
    //             },
    //             "mac": {
    //                 "icon": "./public/favicon.ico"//这里注意配好图标路径
    //             }
    //             // options placed here will be merged with default configuration and passed to electron-builder
    //         }
    //     }
    // },
    pages: {//配置多页面入口        
        index: {
            entry: "src/renderer/main.js",
            template: "public/index.html",
        },
    },
};

