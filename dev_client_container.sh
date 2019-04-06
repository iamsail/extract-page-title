#!/bin/bash

# 这个好像是开发用的
cur_path=$(cd `dirname $0`;pwd)

#docker run --name ept_client -v $cur_path/client:/app/client -d -p 8080:8080 -t ept_client:v0.1 http-server/dist
# docker run --name ept_client -v $cur_path/client:/app/client -d -p 8080:8080 -t ept_client:v0.1 http-server /dist
docker run --name ept_client_dev -v $cur_path/client:/app/client -d -p 8080:8080 -t ept_client:v0.1  npm run serve

