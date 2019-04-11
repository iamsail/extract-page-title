#!/bin/bash

cur_path=$(cd `dirname $0`;pwd)

docker run --name stage_node_py_dev -e TZ=Asia/Shanghai -v $cur_path:/app -d -p 3000:3000 -t ept_node_py:v0.1 npm run stage



#开发时日志查看
#docker logs -f -t --tail 100 ept_node_py_dev

#docker logs -f -t --tail 100 stage_node_py_dev

