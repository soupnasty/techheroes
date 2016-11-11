# Tech Heroes API Documentation


## Authentication
Every request that needs an authenticated user requires an `Authorization` header with the token


## Environment Variables
There are a few configurations managed as environment variables. In the development environment, these are injected by Docker Compose and managed in the `docker-compose.yml` file.

* `DATABASE_URL` - This is the connection URL for the PostgreSQL database. It is not used in the **development environment**.
* `SECRET_KEY` - This is a secret string. It is used to encrypt and verify the authentication token on routes that require authentication. This is required. The app won't start without it.


## Steps to get Docker setup
1. Create a env folder with a dev.txt file in your local project directory
2. Insert needed environment variables in dev.txt file: SECRET_KEY=anything, DEBUG=True
3. Install docker, docker-compose and docker-machine
4. Create a docker-machine `docker-machine create --driver "virtualbox" myBoxName`
5. Start the machine `docker-machine start myBoxName`
6. Allow docker-machine commands to be used in terminal `eval "$(docker-machine env myBoxName)"`
7. Make sure the machine is running `docker-machine ls`
8. Run `docker-compose build` to build the image
3. Run 'docker-machine ip' to check the local server's ip

## Steps to setup api server locally
1. Run `docker-compose run web python manage.py migrate` to make initial migrations
2. Run `docker-compose up` to start all containers

# Run Tests
`docker-compose run web py.test`


## API Table of Contents

#### Users
- [Register a new user](#register-a-new-user)
- [Login a user](#login-a-user)
- [Logout a user](#logout-a-user)
- [Get the users profile](#get-the-users-profile)
- [Update the users profile](#update-the-users-profile)


## API Routes


### Users
Users only require first_name, last_name, email and password to create an account. After creating an account, a user will have to verify their email address by clicking a link sent to their email in order to be able to request a Hero.

#### Register a new user

**POST:** `/api/v1/user/register`

**Body:**
```json
{
    "first_name": "Cam",
    "last_name": "Newton",
    "email": "test@test.com",
    "password": "password1"
}
```

**Notes:**
- `email`: user's email address, must be unique (string)
- `password`: must be at least 8 chars with at least 1 number (string)
- Registering a user will return a valid API auth token.

**Response:**
```json
{
    "id": "99823072-2bcc-4db0-b49e-2f3d8d3dab48",
    "email": "test@test.com",
    "first_name": "Cam",
    "last_name": "Newton",
    "email_verified": false,
    "is_active": true,
    "recieve_notifications": true,
    "created": "2016-11-11T03:42:40.490575Z",
    "updated": "2016-11-11T03:53:54.061195Z",
    "token": "67477a987c024e26b618bc588975f93c"
}
```

**Status Codes:**
- `201` if successfully created
- `400` if incorrect data is provided
- `409` if the email already exist


#### Login a user

**POST:** `/api/v1/user/login`

**Body:**
```json
{
    "email": "test@test.com",
    "password": "password1"
}
```

**Response:**
```json
{
    "id": "99823072-2bcc-4db0-b49e-2f3d8d3dab48",
    "email": "test@test.com",
    "first_name": "Cam",
    "last_name": "Newton",
    "email_verified": false,
    "is_active": true,
    "recieve_notifications": true,
    "created": "2016-11-11T03:42:40.490575Z",
    "updated": "2016-11-11T03:53:54.061195Z",
    "token": "67477a987c024e26b618bc588975f93c"
}
```

**Status Codes:**
- `200` if successful
- `400` if invalid data is sent
- `403` if email and/or password are incorrect


#### Logout a user

**DELETE:** `/api/v1/user/logout`

**Notes:**
- Deletes the current auth token for the user.

**Response:** None

**Status Codes:**
- `204` if successful


#### Get the users profile

**GET:** `/api/v1/user/`

**Response:**
```json
{
    "id": "99823072-2bcc-4db0-b49e-2f3d8d3dab48",
    "email": "test@test.com",
    "first_name": "Cam",
    "last_name": "Newton",
    "email_verified": false,
    "is_active": true,
    "recieve_notifications": true,
    "created": "2016-11-11T03:42:40.490575Z",
    "updated": "2016-11-11T03:53:54.061195Z",
    "token": "67477a987c024e26b618bc588975f93c"
}
```

**Status Codes:**
- `200` if successful
- `403` if no/incorrect token
- `404` if user does not exist


#### Update the users profile

**PATCH:** `/api/v1/user`

**Body:**
```json
{
    "first_name": "Tom",
    "last_name": "Brady",
    "email": "bradytime@gmail.com",
}
```

**Notes:**
- `phone`: A ten-digit US phone number as string
- When a user updates `email`, the user will receive a verification email. `email_verified` will remain false and `email` will remain their old email until the user verifies their email token.
- When a user updates `phone`, the user will receive a verification text. `phone_verified` will remain false and `phone` will remain null until the user verifies their phone token.

**Response:**
```json
{
    "id": "99823072-2bcc-4db0-b49e-2f3d8d3dab48",
    "first_name": "Tom",
    "last_name": "Brady",
    "email": "bradytime@gmail.com",
    "email_verified": false,
    "is_active": true,
    "recieve_notifications": true,
    "created": "2016-11-11T03:42:40.490575Z",
    "updated": "2016-11-11T03:53:54.061195Z",
    "token": "67477a987c024e26b618bc588975f93c"
}
```

**Status Codes:**
- `200` if successful
- `400` if incorrect data is provided
- `403` if user is not authorized or verified
