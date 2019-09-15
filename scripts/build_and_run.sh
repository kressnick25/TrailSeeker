#move to root dir
cd ../

# build new docker image
sudo docker build -t trailseeker .

# run container
sudo docker run -d -p 80:3000 trailseeker

