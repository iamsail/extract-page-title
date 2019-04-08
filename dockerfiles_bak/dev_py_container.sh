#!/bin/bash

cur_path=$(cd `dirname $0`;pwd)

docker run --name ept_py_dev -e TZ=Asia/Shanghai -v $cur_path:/app -d -p 3001:3001 -t ept_py:v0.1-time

# docker exec -it ept_py_dev sh
