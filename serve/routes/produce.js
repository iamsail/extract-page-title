var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
const fs = require('fs');

var app = express();

//设置跨域访问
// app.all('*', function(req, res, next) {
//     console.log('11111 ', process.env.NODE_ENV);
//     res.header("Access-Control-Allow-Origin", "http://localhost:8080");
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     next();
// });


// /* GET home page. */
router.post('/', function(req, res, next) {
    let host = null;
    if (process.env.NODE_ENV === "development") {
        host = "http://localhost:8080";
        res.header("Access-Control-Allow-Origin", host);
    } else if (process.env.NODE_ENV === "stage") {
        host1 = "http://123.207.83.243:8080";
        host2 = "http://url.sail.name";
        if( req.headers.origin == host1 || req.headers.origin == host2 ) {
            res.header("Access-Control-Allow-Origin", req.headers.origin);
        }
    }

    // res.header("Access-Control-Allow-Origin", host);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", "true");


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

