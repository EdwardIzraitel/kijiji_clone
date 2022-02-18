#!/bin/bash
cd ~/kijiji_clone

docker kill $(docker ps -q)