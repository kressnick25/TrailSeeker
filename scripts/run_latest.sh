#!/bin/sh

# stop all running containers with same name
CONTAINER=$(sudo docker ps -q --filter ancestor=nkress/trailseeker)
sudo docker stop $CONTAINER

# pull latest update from dockerhub
sudo docker pull nkress/trailseeker:latest

# Run with flags
# -d : detached
# -p : specify port
# -- restart : unless-stopped
sudo docker run -d -p 80:3000 --restart unless-stopped nkress/trailseeker:latest
