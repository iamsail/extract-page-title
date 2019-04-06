#!/bin/bash

cur_path=$(cd `dirname $0`;pwd)

docker run --name ept_server -v $cur_path:/app -d -p 3000:3000 -t ept_server:v0.1

