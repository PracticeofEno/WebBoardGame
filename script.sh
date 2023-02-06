#!/bin/bash
docker rm nginx frontend backend
docker rmi frontend:42 backend:42 postgres:42
docker system prune
