var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
const fs = require('fs');

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


    //将product视图与指定的对象渲染后输出到客户端
    let url = req.body.url;
    let prePath = path.resolve(process.cwd(), "..");
    let exec = require('child_process').exec;
    let result = {
        code: null,
        msg: null,
        data: null
    };


     // 这里在exec里面，导致 追写文件没有写成功内容 
    exec(`python3 ${prePath}/core/crawler.py ${url}`, (error,stdout,stderr) => {
        if(error) {
            fs.appendFile('./log/case.txt', `${new Date().toLocaleString()} ---- ${url}\n`,  err => {
                if (err) throw err; 
            });
            result.code = 0;
            result.msg = "error";
            result.data = stderr;
        } else {
            result.code = 1;
            result.msg = "success";
            result.data = stdout;
        }
        res.json(result);
    });
});

module.exports = router;

