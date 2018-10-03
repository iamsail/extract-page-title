var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");//配置客户端
    var data={
        code:0,
        data:{name:'aaa',pwd:'123'},
        isSuccess:true,
        msg:"请求成功"
    }
    //将product视图与指定的对象渲染后输出到客户端
    res.json(data);
});

module.exports = router;

