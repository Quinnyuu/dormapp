//入口文件
//引入express框架
const express = require('express')
//创建express对象
const app = express();
//引入接收post请求参数（登录注册请求）需要的第三方包（body-parser）
const bodyParser = require('body-parser')
//导入路由对象
const router = require('./router')
// app.use()中间件 拦截所有/api 请求
app.use('/api/*', function (req, res, next) {
	// 设置请求头为允许跨域
    res.header("Access-Control-Allow-Origin", "*");
    // 设置服务器支持的所有头信息字段
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    // 设置服务器支持的所有跨域请求的方法
    res.header("Access-Control-Allow-Methods", "POST,GET");
    // next()方法表示进入下一个路由
    next();
});
//extended: false 方法内部使用querystring模块处理请求参数的格式
//extended: true 方法内部使用第三方模块qs处理请求参数的格式
app.use(bodyParser.urlencoded({ extended: false }));
//处理json格式的参数
app.use(bodyParser.json())
//配置路由 创建一级路由
app.use('/api',router)
//监听端口
app.listen('3000',function(){
    console.log('服务器已启动在http://localhost:3000')
})