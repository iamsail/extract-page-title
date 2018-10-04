var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');


var app = express();
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


// /* GET home page. */
router.post('/', function(req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");//配置客户端

    var data={
        code:0,
        data:{name:'aaa',pwd:'123'},
        isSuccess:true,
        msg:"请求成功"
    };

    //将product视图与指定的对象渲染后输出到客户端
    let arg1 = req.body.demo;
    let prePath = path.resolve(process.cwd(), "..");
    let exec = require('child_process').exec;
    exec(`python ${prePath}/core/crawler.py ${arg1}`, (error,stdout,stderr) => {
        if(error) {
            console.info('stderr : '+stderr);
        } else {
            console.info('结果是',stdout);
            res.json(stdout);
        }
    });

    //这是发送数据到客户端
    // res.json(result);
});

module.exports = router;

