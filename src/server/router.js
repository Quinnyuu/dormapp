//将路由和请求路径相匹配
//引入express框架
const express = require('express')
//创建路由对象
const router = express.Router()
//导入模块化路由
const api = require('./api')

router.use((req, res, next) => {
    console.log('路由执行成功');
    next();
})

//登录功能 二级路由
router.post('/login', api.login)
//注册功能 二级路由
router.post('/regist', api.regist)

//论坛留言查询
router.post('/articles', api.selectArticle)
//论坛添加留言
router.post('/addArticles', api.addArticles)

//公共物品查找功能
router.post('/goodslist', api.selectGoods)
//公共物品查找功能
router.post('/goodsDetail', api.selectGoodsDetail)
//公共物品删除功能
router.get('/deletegoods', api.deleteGoods)
//公共物品信息修改功能
router.post('/upateGoodsInfo', api.upateGoodsInfo)
//公共物品添加功能
router.post('/addGoods', api.addGoods)
//公共物品添加详细信息功能
router.post('/addGoodsStatus', api.addGoodsStatus)

module.exports = router