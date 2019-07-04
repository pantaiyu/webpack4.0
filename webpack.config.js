let path =require('path')//内置模块
let HtmlWebpackPlugin = require('html-webpack-plugin')//自动建立html  打包在内存种中
let MiniCssExtractPlugin = require('mini-css-extract-plugin')//把css 文件抽离出来 不抽离出来是用js 动态插去得style标签
let MptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')//压缩css

let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')// 因为原本的js压缩被 optimize-css-assets-webpack-plugin 破坏了 所以需要安装 uglifyjs-webpack-plugin
//内置模块
module.exports={
    optimization:{//优化项
        minimizer:[
            new MptimizeCssAssetsWebpackPlugin(),
            new UglifyjsWebpackPlugin({
                cache:true,//是否缓存
                parallel:true,//是否并发打包
                sourceMap:true,//源码映射
            })
        ]
    },
    devServer:{
        port:3000,
        progress:true,//进度条
        contentBase:'./build',
        compress:true,//压缩
        open:true,
    },//开发服务配置
    
    mode:'production',//模式 默认两种 'development' 'production'
    entry:'./src/index.js',
    output:{
        filename:'bundle.[hash].js',//打包后得文件名字 [hash]//每次打包文件都加hash   [hash:8]控制hash值位数
        path:path.resolve(__dirname,'dist')//路径必须是一个绝对路径
    },
    plugins:[//放插件的
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            minify:{
                removeAttributeQuotes:true,//删除属性得 双引号
                collapseWhitespace:false,//折叠空行
            },
            hash:true,//加hash 解决缓存问题
        }),
        new MiniCssExtractPlugin({
            filename:'main.css',
        })
    ],
    //postcss-loader autoprefixer 加浏览器前缀
    module:{
        rules:[//css-loader 接续@import 语法     style-loader 把css插入到head标签中
            //loader 顺序从右向左执行
            {test:/\.css$/,
             use:[
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader'
            ]},
            {test:/\.less$/,
                use:[
                   MiniCssExtractPlugin.loader,
                   'css-loader',
                   'postcss-loader',
                   'less-loader'
            ]}
        ]
    }
}