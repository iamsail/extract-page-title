#!/bin/bash

cur_path=$(cd `dirname $0`;pwd)

# docker run --name ept_node_py_dev -v $cur_path:/app -d -p 3000:3000 -t ept_dev_node_py:v0.1
docker run --name ept_node_py_dev -e TZ=Asia/Shanghai -v $cur_path:/app -d -p 3000:3000 --restart=always -t ept_node_py_dev:v0.1 npm run dev



#开发时日志查看
#docker logs -f -t --tail 100 ept_node_py_dev

