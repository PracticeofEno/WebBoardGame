#!/bin/bash
docker rm nginx frontend backend
docker rmi frontend:42 backend:42 nginx
docker system prune
