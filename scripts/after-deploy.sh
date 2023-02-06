#!/bin/bash
REPOSITORY=/home/ubuntu/test

cd $REPOSITORY
docker-compose stop
docker rm frontend backend
docker rmi frontend:42 backend:42
docker system prune -f
docker-compose up -d

