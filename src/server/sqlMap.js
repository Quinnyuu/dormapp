//sql语句
const sqlMap = {
  //登录注册
  selectUser: 'select * from userinfo where userNo = ?',
  insertUser: 'insert into userinfo(userNo,username,password,dormBuilding,dormNo) values(?,?,?,?,?)',
  //论坛
  selectArticle: 'SELECT a.userName,a.picUrl,b.* FROM userinfo AS a,articleinfo AS b WHERE a.userNo = b.userNo AND a.dormBuilding = ? AND a.dormNo = ?',
  addArticles: 'insert into articleinfo VALUES(?,?,?,?,?,?,?)',
  //公共物品管理
  selectAllGoods: 'select * from goodsinfo where dormBuilding = ? and dormNo = ?',
  selectSomeGoods: 'select * from goodsinfo where dormBuilding = ? and dormNo = ? and goodsStatus = ?',
  selectGoods: 'select * from goodsinfo where goodsId = ?',
  selectGoodsDetail: 'select * from goodsstatusinfo where goodsId = ? order by alertTime desc',
  deleteGoods: 'delete from goodsinfo where goodsId = ?',
  addGoods: 'insert into goodsinfo VALUES(?,?,?,?,?,?,?,?)',
  addGoodsStatus: 'insert into goodsstatusinfo VALUES(?,?,?,?,?,?,?)',
  upateGoodsInfo: 'update goodsinfo SET goodsName = ?,goodsStatus = ?,goodsCount = ?,goodsDetail = ? where goodsId = ?',
  //个人信息
  alertInfo: 'UPDATE userinfo SET userName = ?,age = ?,sex = ?,introduction = ?,phone = ?,birthday = ? WHERE userNo = ?',
  alertPassword: 'UPDATE userinfo SET passwor = ? WHERE userNo = ?',
}
module.exports = sqlMap;