#!/bin/bash
sudo chmod -R 777 /home/ubuntu/kijiji_clone
cd /home/ubuntu/kijiji_clone
docker-compose build
docker-compose --env-file .env up -d