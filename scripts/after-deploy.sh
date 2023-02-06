#!/bin/bash
REPOSITORY=/home/ubuntu/test

cd $REPOSITORY
docker rm frontend backend 
echo "rm success" >> log
docker rmi frontend:42 backend:42
echo "rmi success" >> log
docker system prune -f
echo "prune success" >> log
docker-compose up -d
