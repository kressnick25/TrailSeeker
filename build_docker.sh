# login to docker, requires user creds
sudo docker login

# build client side
cd ./client
yarn deploy

# move back to root dir
cd ../

# build docker and uploadsu
sudo docker build -t nkress/trailfinder:latest .
sudo docker push nkress/trailfinder:latest