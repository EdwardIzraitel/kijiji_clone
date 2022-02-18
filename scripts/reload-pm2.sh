#!/bin/bash
sudo chmod -R 777 /home/ubuntu/kijiji_clone
cd /home/ubuntu/kijiji_clone
sudo apt-get install docker docker-compose
docker-compose up --build -d