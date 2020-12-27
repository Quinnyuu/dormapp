const db = require('./db');
const sqlMap = require('./sqlMap');

//登录功能
exports.login = (req, res) => {
    let userNo = req.body.userNo;
    let password = req.body.password;
    db.base(sqlMap.selectUser, userNo, (result) => {
        if(!result.length){
            return res.json({ status: 1, msg: '登录失败' })
        }else{
            if(result[0].password==password){
                return res.json({ status: 3, msg: '登录成功', list: result})
            }
            return res.json({ status: 2, msg: '密码错误' })
        }
    })
}
//注册功能
exports.regist = (req, res) => { 
    const userNo = req.body.userNo;
    const username = req.body.username;
    const password = req.body.password;
    const floor = req.body.floor;
    const dormNo = req.body.dormNo;
    db.base(sqlMap.selectUser, userNo, (result) => { 
        if(result.length !== 0) {
            return res.json({ status: 1, msg: '改用户已经存在' });
        } else {
            db.base(sqlMap.insertUser, [userNo, username, password, floor, dormNo], (result) => {
                if (result.affectedRows == 1) {
                    return res.json({ status: 3, msg: '注册成功' })
                } else {
                    return res.json({ status: 2, msg: '注册失败' })
                }
            })
        }
    })
}

//论坛留言查询
exports.selectArticle = (req, res) => {
    const dormBuilding = req.body.dormBuilding ? req.body.dormBuilding : null;
    const dormNo = req.body.dormNo ? req.body.dormNo : null;
    db.base(sqlMap.selectArticle, [dormBuilding, dormNo], (result) => {
        console.log(result);
        if (result.length !== 0) {
            return res.json({ status: 1, msg: '查找成功', list: result})
        } else {
            return res.json({ status: 2, msg: '无返回结果'})
        }
    })
}
//添加留言
exports.addArticles = (req, res) => {
    const articleId = req.body.articleId ? req.body.articleId : null;
    const articleCont = req.body.articleCont ? req.body.articleCont : null;
    const userNo = req.body.userNo ? req.body.userNo : null;
    const time = req.body.time ? req.body.time : null;
    const likeCount = req.body.likeCount ? req.body.likeCount : 0;
    const dormBuilding = req.body.dormBuilding ? req.body.dormBuilding : null;
    const dormNo = req.body.dormNo ? req.body.dormNo : null;
    db.base(sqlMap.addArticles, [articleId, articleCont ,userNo , time, likeCount, dormBuilding, dormNo], (result) => {
        console.log(result);
        if (result.affectedRows !== 0) {
            return res.json({ status: 1, msg: '添加成功'})
        } else {
            return res.json({ status: 2, msg: '添加失败'})
        }
    })
}

//公共物品管理接口
exports.selectGoods = (req, res) => {
    const goodsId = req.body.goodsId ? req.body.goodsId : null;
    const dormBuilding = req.body.dormBuilding ? req.body.dormBuilding : null;
    const dormNo = req.body.dormNo ? req.body.dormNo : null;
    const goodsStatus = req.body.goodsStatus ? req.body.goodsStatus : null;
    if (goodsId == null) {
        if (goodsStatus == null) {
            db.base(sqlMap.selectAllGoods, [dormBuilding, dormNo], (result) => {
                if (result.length !== 0) {
                    return res.json({ status: 1, msg: '查找成功', list: result})
                } else {
                    return res.json({ status: 2, msg: '查找失败'})
                }
            })
        } else {
            db.base(sqlMap.selectSomeGoods, [dormBuilding, dormNo, goodsStatus], (result) => {
                if (result.length !== 0) {
                    return res.json({ status: 1, msg: '查找成功', list: result})
                } else {
                    return res.json({ status: 2, msg: '无返回结果'})
                }
            })
        }
    } else {
        db.base(sqlMap.selectGoods, [goodsId], (result) => {
            console.log(result);
            if (result.length !== 0) {
                return res.json({ status: 1, msg: '查找成功', list: result})
            } else {
                return res.json({ status: 2, msg: '查找失败'})
            }
        })
    }
}
//查找物品详细
exports.selectGoodsDetail = (req, res) => {
    const goodsId = req.body.goodsId ? req.body.goodsId : null;
    db.base(sqlMap.selectGoodsDetail, [goodsId], (result) => {
        console.log(result);
        if (result.length !== 0) {
            return res.json({ status: 1, msg: '查找成功', list: result})
        } else {
            return res.json({ status: 2, msg: '查找失败'})
        }
    })
}
//删除物品
exports.deleteGoods = (req, res) => {
    const goodsId = req.query.goodsId ? req.query.goodsId : null;
    db.base(sqlMap.deleteGoods, [goodsId], (result) => {
        console.log(result.affectedRows);
        if (result.affectedRows !== 0) {
            return res.json({ status: 1, msg: '删除成功'})
        } else {
            return res.json({ status: 2, msg: '删除失败'})
        }
    })
}
//修改物品信息
exports.upateGoodsInfo = (req, res) => {
    const goodsName = req.body.goodsName ? req.body.goodsName : null;
    const goodsStatus = req.body.goodsStatus ? req.body.goodsStatus : null;
    const goodsCount = req.body.goodsCount ? req.body.goodsCount : null;
    const goodsDetail = req.body.goodsDetail ? req.body.goodsDetail : null;
    const goodsId = req.body.goodsId ? req.body.goodsId : null;
    db.base(sqlMap.upateGoodsInfo, [goodsName, goodsStatus ,goodsCount , goodsDetail, goodsId], (result) => {
        console.log(result);
        if (result.affectedRows !== 0) {
            return res.json({ status: 1, msg: '修改成功'})
        } else {
            return res.json({ status: 2, msg: '修改失败'})
        }
    })
}
//添加物品
exports.addGoods = (req, res) => {
    const goodsId = req.body.goodsId ? req.body.goodsId : null;
    const goodsName = req.body.goodsName ? req.body.goodsName : null;
    const goodsStatus = req.body.goodsStatus ? req.body.goodsStatus : null;
    const goodsCount = req.body.goodsCount ? req.body.goodsCount : null;
    const goodsDetail = req.body.goodsDetail ? req.body.goodsDetail : null;
    const dormBuilding = req.body.dormBuilding ? req.body.dormBuilding : null;
    const dormNo = req.body.dormNo ? req.body.dormNo : null;
    const goodsPic = req.body.goodsPic ? req.body.goodsPic : null;
    db.base(sqlMap.addGoods, [goodsId, goodsName ,goodsStatus , goodsCount, goodsDetail, dormBuilding, dormNo, goodsPic], (result) => {
        console.log(result);
        if (result.affectedRows !== 0) {
            return res.json({ status: 1, msg: '添加成功'})
        } else {
            return res.json({ status: 2, msg: '添加失败'})
        }
    })
}
//添加物品状态信息
exports.addGoodsStatus = (req, res) => {
    const goodsStatusId = req.body.goodsStatusId ? req.body.goodsStatusId : null;
    const goodsId = req.body.goodsId ? req.body.goodsId : null;
    const alertTime = req.body.alertTime ? req.body.alertTime : null;
    const userNo = req.body.userNo ? req.body.userNo : null;
    const userName = req.body.userName ? req.body.userName : null;
    const option = req.body.option ? req.body.option : null;
    const detail = req.body.detail ? req.body.detail : null;
    db.base(sqlMap.addGoodsStatus, [goodsStatusId, goodsId ,alertTime , userNo, userName, option, detail], (result) => {
        console.log(result);
        if (result.affectedRows !== 0) {
            return res.json({ status: 1, msg: '添加成功'})
        } else {
            return res.json({ status: 2, msg: '添加失败'})
        }
    })
}