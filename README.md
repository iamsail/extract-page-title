# extract-page-title
a tool for wirte blog more fast

# 测试地址

http://123.207.83.243:8080

# Todo

- [ ] 支持爬虫携带参数
- [ ] 支持批处理
- [ ] 支持hexo和onenote模式切换
- [ ] 安全性支持
- [ ] 错误日志支持
- [ ] nodejs热更新支持
- [x] docker
    - [x] (docker部署支持)
    - [x] (docker本地开发宿主机和容器同步支持,dockerfile待更新)  
- [ ] 搜索url历史，本地缓存支持
- [ ] UI美化
- [ ] 增加后台统计，服务请求次数等
- [ ] 域名解析

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

# command
```
docker run —-name ept_client -v /home/sail/projects/extract-page-title/client/dist:/app/client/dist -p 8080:8080 -t -d ept_client:v0.2 http-server /dist

docker run --name ept_server -v /home/sail/projects/extract-page-title/core:/app/core -d -p 3000:3000 -t ept_server:v0.1

docker build -t pynode:v2.0 -f Dockerfile_node_py_1 .
```
