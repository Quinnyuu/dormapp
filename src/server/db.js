// 数据库连接配置
const mysql = require('mysql');
exports.base = (sql,data,callback)=>{
	//创建数据库对象
const mycon = mysql.createConnection({
    host: '127.0.0.1',      // 新建数据库连接时的 主机名或ID地址 内容
    user: 'quinn', 
    password: '19981027',   // root 密码
    database: 'dorm',      // 数据库名
})
  mycon.connect((err) => { 
    if (err) throw err;
    console.log('数据库连接成功')
  });
  mycon.query(sql,data, function (error, results) {
  	if (error) throw error;
  	callback && callback(results)
	})
	mycon.end();
}