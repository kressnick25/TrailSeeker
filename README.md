# CAB432 TrailSeeker Mashup

## Installation
### Docker
move to the `./scripts` folder then run:

`/build_and_run.sh`

or from the root of the repository build

```docker build -t trailseeker .```

and run
 
```docker run -d -p 80:3000 trailseeker```

### Local Development
It is reccomended to use `yarn` with this project.
npm currently works as well, but a package-lock.json file is not included.

yarn can be installed using `sudo npm install yarn -g`

Install npm dependencies by moving to scripts and using

`install-yarn.sh` or `install-npm.sh`

Start the project by running `yarn start` in the server directory

### Serving React with Express
This project is setup to serve a production react build using express.
This is pre-compiled, but any changes to the React code will need to
be built by moving to the `src/client` directory and running `yarn deploy`.

If for some reason the build folder is deleted entirely, run `yarn build` and
manually move the build folder to the `src/server/` directory.

## Deploying to Dockerhub
Two scripts are included in `./scripts` to assist this process. 
use `deploy_docker.sh` to build the docker image and push to dockerhub.
Replace `nkress` in the dockerfile with your username.

Then use `run_latest.sh` to pull the docker image from dockerhub and run. 
Again replacing `nkress` with your username.