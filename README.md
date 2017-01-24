# Tech Heroes API Documentation

## Summary
Get on-demand advice from seasoned software engineers from all disciplines. A user will be able look through a list of Heroes (seasoned developers). They can then request a call from a Hero. The Hero will either accept or decline. If a Hero accepts, a time is agreed upon and each person will get a text reminder 15 min before the call. The text will include the conference number to dial into. After the call, the Hero is paid.


## Authentication
Every request that needs an authenticated user requires an `Authorization` header with the token

## Domain Configurations
* The web domain for Tech Heroes is www.techheroes.xyz
* The api domain for Tech Heroes is api.techheroes.xyz

## Environment Variables
There are a few configurations managed as environment variables. In the development environment, these are injected by Docker Compose and managed in the `docker-compose.yml` file.

* `SECRET_KEY` - This is a secret string. It is used to encrypt and verify the authentication token on routes that require authentication. This is required. The app won't start without it.
* `DEBUG` - This boolean tells Django to return descriptive error functions for development
* `DJANGO_SETTINGS_MODULE` - This specifies the settings file to use
* `DATABASE_URL` - This is the connection URL for the PostgreSQL database. It is not used in the **development environment**.
* `AWS_ACCESS_KEY` and `AWS_SECRET_KEY` - Amazon web services credentials
* `TWILIO_ACCOUNT_ID` and `TWILIO_API_TOKEN` - Twilio credentials
* `TWILIO_NUMBER` - The Tech Heroes Twilio number used to send alerts.
* `STRIPE_TEST_SECRET_KEY` and `STRIPE_TEST_PUB_KEY` are required for Stripe testing
* `STRIPE_LIVE_SECRET_KEY` and `STRIPE_LIVE_PUB_KEY`

## Steps to get Docker setup
1. Create a env folder with a dev.txt file in your local project directory
2. Insert needed environment variables in dev.txt file: SECRET_KEY=anything, DEBUG=True
3. Install docker, docker-compose and docker-machine
4. Create a docker-machine `docker-machine create --driver "virtualbox" myBoxName`
5. Start the machine `docker-machine start myBoxName`
6. Allow docker-machine commands to be used in terminal `eval "$(docker-machine env myBoxName)"`
7. Make sure the machine is running `docker-machine ls`

## Backend local development workflow
1. Make sure you are in the directory with the docker-compose.yml
2. Run `docker-compose build` (only if new dependencies were added)
3. Run `docker-compose run django python manage.py migrate` (only if new migrations are needed)
4. Run `docker-compose up` (wait for webpack to finish bundling)
5. You can make backend changes and save while the server is up
6. Run `docker-compose run django py.test` to run backend tests

## Frontend local development workflow
1. Make sure you are in the directory with the docker-compose.yml
2. Run `docker-compose run web npm install` download the node_modules locally
3. Run `docker-compose up` (wait for webpack to finish bundling)
4. You can make frontend changes and save while the server is up

