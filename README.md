# Tech Heroes API Documentation


## Authentication
Every request that needs an authenticated user requires an `Authorization` header with the token


## Environment Variables
There are a few configurations managed as environment variables. In the development environment, these are injected by Docker Compose and managed in the `docker-compose.yml` file.

* `DATABASE_URL` - This is the connection URL for the PostgreSQL database. It is not used in the **development environment**.
* `SECRET_KEY` - This is a secret string. It is used to encrypt and verify the authentication token on routes that require authentication. This is required. The app won't start without it.


## Steps to get the api server running locally
1. Create a env folder with a dev.txt file in your local project directory
2. Insert needed environment variables in dev.txt file: SECRET_KEY=anything, DEBUG=True
3. Install docker, docker-compose and docker-machine
4. Start a docker virtual machine (check if it's running using command `docker-machine ls`)
5. Run `docker-compose build` to create the image
6. Run `docker-compose up -d` to start all containers in the background
7. Run `docker-compose run web python manage.py migrate` to make initial migrations
8. Run `docker-compose run web py.test` to run tests
9. Routes can be hit using your docker-machine's ip
