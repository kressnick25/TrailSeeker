#!/bin/sh

# stop all running containers with same name
CONTAINER=$(docker ps -q --filter ancestor=nkress/trailfinder)
docker stop $CONTAINER

# pull latest update from dockerhub
docker pull nkress/trailfinder:latest

# Run with flags
# -d : detached
# -p : specify port
# -- restart : unless-stopped
docker run -d -p 80:3000 --restart unless-stopped nkress/trailfinder:latest
