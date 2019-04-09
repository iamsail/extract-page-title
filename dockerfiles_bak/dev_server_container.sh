#!/bin/bash

cur_path=$(cd `dirname $0`;pwd)

docker run --name ept_server_dev -v $cur_path:/app -d -p 3000:3000 -t ept_server:v0.1-dev

#开发时日志查看
#docker logs -f -t --tail 100 ept_server_dev

