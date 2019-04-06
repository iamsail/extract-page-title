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
    let result = {
        code: null,
        msg: null,
        data
    };


    exec(`python3 ${prePath}/core/crawler.py ${arg1}`, (error,stdout,stderr) => {
        console.log('arg1=>xxxddd ', arg1);
        if(error) {
            console.log('ddd=> ');
            // console.info('stderr : '+stderr);
            result.code = 0;
            result.msg = "error";
            result.data = stderr;
            res.json(result);
        } else {
            // node 没有支持热更新
            console.log('arg1=> ', arg1);
            console.log('arg1=> ', arg1);
            console.info('结果是',stdout);

            result.code = 1;
            result.msg = "success";
            result.data = stdout;

            res.json(result);
        }
    });

    //这是发送数据到客户端
    // res.json(result);
});

module.exports = router;

