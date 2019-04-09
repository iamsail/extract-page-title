# extract-page-title
a tool for wirte blog more fast

# 测试地址

http://123.207.83.243:8080

# Todo

- [x] 支持爬虫携带参数
- [x] 前端对链接进行正则检测
- [x] UI美化
- [ ] 进行配置化
- [x] 安全性支持
- [x] 错误日志支持
- [x] 时区问题，在优化dockerfile的时候一起解决，包括volume挂在写入dockerfile，拆分容器
- [x] nodejs热更新支持
- [x] docker
    - [x] (docker部署支持)
    - [x] (docker本地开发宿主机和容器同步支持,dockerfile待更新)  
- [ ] 搜索url历史，本地缓存支持
- [ ] 增加后台统计，服务请求次数等
- [ ] 接入google分析
- [x] 域名解析
- [ ] python虚拟环境
- [ ] 支持hexo和onenote模式切换


# 不能处理的case收集

- https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE
- https://birdben.github.io/2017/05/02/Docker/Docker%E5%AE%9E%E6%88%98%EF%BC%88%E4%BA%8C%E5%8D%81%E4%B8%83%EF%BC%89Docker%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E9%80%9A%E4%BF%A1/
- http://eux.baidu.com/blog/fe/npm%20aduit%E4%BA%8C%E4%B8%89%E4%BA%8B


# links
- [GitHub Help](https://help.github.com/categories/writing-on-github/)
- [用emoji表情提交代码指南 · Issue #71 · muwenzi/Program-Blog · GitHub](https://github.com/muwenzi/Program-Blog/issues/71)
- [程序员 git commit 时 emoji 使用指南 - Liu-Cheng Xu - CSDN博客](https://blog.csdn.net/simple_the_best/article/details/53320275)
- [git提交规范（文字版与emoji表情版） - momDIY的博客 - CSDN博客](https://blog.csdn.net/momDIY/article/details/80507684)
- [Docker ： vue.js部署 、测试镜像编译生成](https://www.jianshu.com/p/09cf1abffbec)
- [用 Docker 搭建 Node Express 应用](http://guide.daocloud.io/dcs/docker-node-express-9153906.html)
- [关于Dockerfile文件的命名](http://www.talkwithtrend.com/Question/153473)
- [Docker容器应用日志查看](https://blog.csdn.net/benben_2015/article/details/80708723)
- [实时查看docker容器日志](https://blog.csdn.net/wen_1108/article/details/78356655)
- [node.js在生产环境中修改代码后可不可以不重启node.js而运行新的代码？](https://cnodejs.org/topic/547342b7a3e2aee40698dfc0)
- [快速入门 | PM2教程](https://pm2.io/doc/zh/runtime/quick-start/)
- [docker结合pm2部署node项目 | Poetry's Blog](http://blog.poetries.top/2018/11/26/docker-pm2-deploy-node-proj/)
- [PM2实用入门指南 - 程序猿小卡 - 博客园](https://www.cnblogs.com/chyingp/p/pm2-documentation.html)
- [Docker 常用命令与操作 - 简书](https://www.jianshu.com/p/adaa34795e64)
- [如何编写最佳的Dockerfile | Fundebug博客](https://blog.fundebug.com/2017/05/15/write-excellent-dockerfile/)
- [unicode - How to fetch a non-ascii url with Python urlopen? - Stack Overflow](https://stackoverflow.com/questions/4389572/how-to-fetch-a-non-ascii-url-with-python-urlopen)
# 项目启动

### 生成镜像
```
cd client
docker build -t ept_client:v0.1 -f ./Dockerfile_client .

cd ..
docker build -t ept_dev_node_py:v0.1 -f ./Dockerfile_dev_node_py .

docker build -t ept_dev_node_py:v0.2 -f ./Dockerfile_dev_node_py .
```


### 生成容器
```
./dev_client_container.sh
./dev_node_py_container.sh
```


# 思考

这种node去执行python文件的方式，如果用docker来做的话，是否可以开发阶段用一种镜像，上线就用其他镜像，谷歌的那种;
否则没必要用node去做中转，要么直接后端用py写。或者爬虫js来搞。