# login to docker, requires user creds
sudo docker login

cd ../

# build docker and upload
sudo docker build -t nkress/trailseeker:latest .
sudo docker push nkress/trailseeker:latest