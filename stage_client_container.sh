#!/bin/bash

cur_path=$(cd `dirname $0`;pwd)

docker run --name ept_client_stage -v $cur_path/client:/app/client -d -p 8080:8080 --restart=always -t ept_client:v0.1  npm run stage

# docker logs -f -t --tail 100 ept_client_stage