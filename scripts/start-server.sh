#!/bin/bash

echo "--------------- 서버 배포 시작 -----------------"
docker stop nest-api || true
docker rm nest-api || true
docker pull 977099027173.dkr.ecr.ap-northeast-2.amazonaws.com/nest-api:latest
docker run -d --name nest-api -p 3000:3000 977099027173.dkr.ecr.ap-northeast-2.amazonaws.com/nest-api:latest
echo "--------------- 서버 배포 끝 -----------------"
