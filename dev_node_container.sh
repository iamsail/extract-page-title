#!/bin/bash

cur_path=$(cd `dirname $0`;pwd)

docker run --name ept_node_dev -e TZ=Asia/Shanghai -v $cur_path:/app -d -p 3000:3000 -t ept_node:v0.1-time

# docker exec -it ept_node_dev sh


