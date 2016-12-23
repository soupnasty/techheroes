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
4. Run `docker-compose up`
5. You can make backend changes and save while the server is up

## Frontend local development workflow
0. [Helpful frontend Docker workflow article](https://medium.com/@tribou/react-and-flux-a-docker-development-workflow-469957f3bbf0#.wko4im9d1)
1. Add dependencies to package.json file
2. Run `docker-compose run web npm install` download the node_modules locally
3. Make front end changes and test them manually
4. Run `docker-compose up` to test the system as a whole in prod-like environment

## Steps to setup api server locally
1. Run `docker-compose run web python manage.py migrate` to make initial migrations
2. Run `docker-compose up` to start all containers

# Run Tests
`docker-compose run web py.test`


## API Table of Contents

#### User Routes
- [Create a phone token](#create-a-phone-token)
- [Register a new user](#register-a-new-user)
- [Login a user](#login-a-user)
- [Logout a user](#logout-a-user)
- [Get the users profile](#get-the-users-profile)
- [Update the users profile](#update-the-users-profile)
- [Verify a users email](#verify-a-users-email)
- [Verify a users phone](#verify-a-users-phone)
- [Change the users password](#change-the-users-password)
- [Request a password reset](#request-a-password-reset)
- [Reset a users password](#reset-a-users-password)
- [Get a users local time](#get-a-users-local-time)

#### Hero Routes
- [Apply to be Hero](#apply-to-be-hero)
- [Get Hero profile](#get-hero-profile)
- [Update Hero profile](#update-hero-profile)
- [Accept Hero](#accept-hero)
- [Decline Hero](#decline-hero)
- [Get Hero list](#get-hero-list)
- [Get Hero detail](#get-hero-detail)

#### Call Request Routes
- [Create a call request](#create-a-call-request)
- [Accept a call request](#accept-a-call-request)
- [Decline a call request](#decline-a-call-request)
- [Suggest new times](#suggest-new-times)
- [Accept time](#accept-time)
- [Get Call Request list](#get-call-request-list)
- [Get Call Request detail](#get-call-request-detail)
- [Cancel a Call Request](#cancel-a-call-request)

#### Conference Routes
- [Get Conference list](#get-conference-list)
- [Get Conference detail](#get-conference-detail)


## API Routes


### User Routes
Users require a first_name, last_name, email, password, phone, phone_token and timezone to create an account. After creating an account, a user will have to verify their email address by clicking a link sent to their email. This applies to both Heroes and Users.


#### Create a phone token

**POST:** `/api/v1/accounts/phone-token`

**Notes:**
- `phone`: A ten-digit US phone number as string

**Body:**
```json
{
    "phone": "5555555555"
}
```

**Response:**
```json
{
    "phone_token": "abc123"
}
```

**Status Codes:**
- `201` if successfully created
- `400` if the phone is already verified with another user or phone token already exists
- `424` twilio failed to send a message to the provided phone number


#### Register a new user

**POST:** `/api/v1/accounts/register`

**Notes:**
- `email`: user's email address, must be unique (string)
- `password`: must be at least 8 chars with at least 1 number (string)
- `phone`: A ten-digit US phone number as string
- `phone_token`: 6 character combinations of lowercase letters and digits
- `timezone`: We need this so we can inform users the timezone the hero they are requesting is in and vice versa. Also need their timezone to format the UTC times to their aware local time.

**Body:**
```json
{
    "first_name": "Cam",
    "last_name": "Newton",
    "email": "test@test.com",
    "password": "password1",
    "phone": "5555555555",
    "phone_token": "abc123",
    "timezone": "America/Chicago"
}
```

**Response:**
```json
{
    "id": "085e8bbf-4430-4df8-9233-8269b52bd4bf",
    "first_name": "Cam",
    "last_name": "Newton",
    "email": "test@test.com",
    "email_verified": false,
    "email_notifications": true,
    "phone": "5555555555",
    "phone_verified": true,
    "profile_image": null,
    "is_active": true,
    "email_pending": "test@test.com",
    "phone_pending": null,
    "timezone": "America/Chicago",
    "created": "2016-11-16T15:56:56.179930Z",
    "updated": "2016-11-16T15:59:09.189275Z",
    "token": "ccf66788480947c48e7c7a3eb168ee12"
}
```

**Status Codes:**
- `201` if successfully created
- `400` if incorrect data is provided
- `409` if the email already exist


#### Login a user

**POST:** `/api/v1/accounts/login`

**Body:**
```json
{
    "email": "test@test.com",
    "password": "password1",
}
```

**Response:**
```json
{
    "id": "085e8bbf-4430-4df8-9233-8269b52bd4bf",
    "first_name": "Cam",
    "last_name": "Newton",
    "email": "test@test.com",
    "email_verified": false,
    "email_notifications": true,
    "phone": "5555555555",
    "phone_verified": true,
    "profile_image": null,
    "is_active": true,
    "email_pending": "test@test.com",
    "phone_pending": null,
    "timezone": "America/Chicago",
    "created": "2016-11-16T15:56:56.179930Z",
    "updated": "2016-11-16T15:59:09.189275Z",
    "token": "ccf66788480947c48e7c7a3eb168ee12"
}
```

**Status Codes:**
- `200` if successful
- `400` if invalid data is sent
- `403` if email and/or password are incorrect


#### Logout a user

**DELETE:** `/api/v1/accounts/logout`

**Notes:**
- Deletes the current auth token for the user.

**Response:** None

**Status Codes:**
- `204` if successful


#### Get the users profile

**GET:** `/api/v1/accounts/profile`

**Response:**
```json
{
    "id": "085e8bbf-4430-4df8-9233-8269b52bd4bf",
    "first_name": "Cam",
    "last_name": "Newton",
    "email": "test@test.com",
    "email_verified": false,
    "email_notifications": true,
    "phone": "5555555555",
    "phone_verified": true,
    "profile_image": null,
    "is_active": true,
    "email_pending": "test@test.com",
    "phone_pending": null,
    "timezone": "America/Chicago",
    "created": "2016-11-16T15:56:56.179930Z",
    "updated": "2016-11-16T15:59:09.189275Z",
}
```

**Status Codes:**
- `200` if successful
- `403` if no/incorrect token
- `404` if user does not exist


#### Update the users profile

**PATCH:** `/api/v1/accounts/profile`

**Notes:**
- When a user updates `email`, the user will receive a verification email. `email_verified` will remain false and `email` will remain their old email until the user verifies their email token.
- `email_pending`: this is the email that is awaiting to be saved for the user once they verify
- When a user updates `phone`, the user will receive a verification text. `phone_verified` will remain false and `phone` will remain null until the user verifies their phone token.
- `phone_pending`: this is the phone number that is awaiting to be saved for the user once they verify
- `profile_image` is a image url link

**Body:**
```json
{
  	"email": "bradytime@gmail.com",
  	"first_name": "Tom",
  	"last_name": "Brady",
  	"is_active": false,
  	"email_notifications": false,
  	"phone": "1234567890",
    "profile_image": "https://media.licdn.com/mpr/mpr/shrink_100_100/p/5/005/040/0cd/008cf89.jpg"
}
```

**Response:**
```json
{
    "id": "085e8bbf-4430-4df8-9233-8269b52bd4bf",
    "first_name": "Tom",
    "last_name": "Brady",
    "email": "bradytime@gmail.com",
    "email_verified": false,
    "email_notifications": false,
    "phone": null,
    "phone_verified": false,
    "profile_image": "https://media.licdn.com/mpr/mpr/shrink_100_100/p/5/005/040/0cd/008cf89.jpg",
    "is_active": false,
    "email_pending": "test@test.com",
    "phone_pending": "1234567890",
    "timezone": "America/Chicago",
    "created": "2016-11-16T15:56:56.179930Z",
    "updated": "2016-11-16T17:02:27.978451Z"
}
```

**Status Codes:**
- `200` if successful
- `400` if incorrect data is provided
- `403` if user is not authorized or verified


#### Verify a users email

**POST:** `/api/v1/accounts/verify-email`

**Notes:**
- `token`: Email verification tokens are 10 character combinations of lowercase letters and digits
- Once the email is verified `email_pending` becomes null and `email_verified` becomes true

**Body:**
```json
{
    "token": "12dfg2wer6",
}
```

**Response:**
```json
{
    "id": "085e8bbf-4430-4df8-9233-8269b52bd4bf",
    "first_name": "Tom",
    "last_name": "Brady",
    "email": "bradytime@gmail.com",
    "email_verified": true,
    "email_notifications": false,
    "phone": null,
    "phone_verified": false,
    "profile_image": "https://media.licdn.com/mpr/mpr/shrink_100_100/p/5/005/040/0cd/008cf89.jpg",
    "is_active": false,
    "email_pending": null,
    "phone_pending": "1234567890",
    "timezone": "America/Chicago",
    "created": "2016-11-16T15:56:56.179930Z",
    "updated": "2016-11-16T17:02:27.978451Z"
}
```

**Status Codes:**
- `200` if successful
- `400` is bad data is sent
- `403` if user is not authenticated
- `404` if the token is invalid or expired


#### Verify a users phone

**POST:** `/api/v1/accounts/verify-phone`

**Notes:**
- `token`: Phone verification tokens are 6 character combinations of lowercase letters and digits
- Once the phone is verified `phone_pending` becomes null and `phone_verified` becomes true

**Body:**
```json
{
    "token": "abc123",
}
```

**Response:**
```json
{
    "id": "085e8bbf-4430-4df8-9233-8269b52bd4bf",
    "first_name": "Tom",
    "last_name": "Brady",
    "email": "bradytime@gmail.com",
    "email_verified": true,
    "email_notifications": true,
    "phone": "1234567890",
    "phone_verified": true,
    "profile_image": "https://media.licdn.com/mpr/mpr/shrink_100_100/p/5/005/040/0cd/008cf89.jpg",
    "is_active": false,
    "email_pending": null,
    "phone_pending": null,
    "timezone": "America/Chicago",
    "created": "2016-11-16T15:56:56.179930Z",
    "updated": "2016-11-16T17:02:27.978451Z"
}
```

**Status Codes:**
- `200` if successful
- `400` is bad data is sent
- `403` if user is not authenticated
- `404` if the token is invalid or expired


#### Change the users password

**POST:** `/api/v1/accounts/change-password`

**Notes:**
- `old_password`: must be at least 8 chars with at least 1 number
- `new_password`: must be at least 8 chars with at least 1 number

**Body:**
```json
{
    "old_password": "oldpass1",
    "new_password": "newpass1"
}
```

**Response:** None

**Status Codes:**
- `200` if successful
- `400` if invalid data is provided, or `old_password` doesn't match
- `403` if user is not authenticated


#### Request a password reset

**POST:** `/api/v1/accounts/request-password`

**Notes:**
- `email`: a valid email address. The user's `email_verified` must be true.

**Body:**
```json
{
    "email": "test@test.com",
}
```

**Response:**
```json
{
    "detail": "A reset code has been sent to your email address."
}
```

**Status Codes:**
- `200` if successful
- `400` is bad data is sent
- `404` if the email or phone is not found


#### Reset a users password

**POST:** `/api/v1/accounts/reset-password`

**Notes:**
- This route resets a user's password and logs them in
- `token`: verification token is a 8 character combinations of lowercase letters and digits
- `new_password`: must be at least 8 chars with at least 1 number

**Body:**
```json
{
    "token": "12dfg2we",
    "new_password": "newpass1"
}
```

**Response:**
```json
{
    "id": "085e8bbf-4430-4df8-9233-8269b52bd4bf",
    "first_name": "Tom",
    "last_name": "Brady",
    "email": "bradytime@gmail.com",
    "email_verified": true,
    "email_notifications": true,
    "phone": "1234567890",
    "phone_verified": true,
    "profile_image": "https://media.licdn.com/mpr/mpr/shrink_100_100/p/5/005/040/0cd/008cf89.jpg",
    "is_active": false,
    "email_pending": null,
    "phone_pending": null,
    "timezone": "America/Chicago",
    "created": "2016-11-16T15:56:56.179930Z",
    "updated": "2016-11-16T17:02:27.978451Z",
    "token": "ccf66788480947c48e7c7a3eb168ee12"
}
```

**Status Codes:**
- `200` if successful
- `400` is bad data is sent
- `404` if the password token is invalid or expired


#### Get a users local time

**POST:** `/api/v1/accounts/get-time`

**Notes:**
- This route takes a UTC datetime and returns the local datetime for the user
- `user_id`: UUID of the user
- `utc_datetime`: UTC datetime in the format "YYYY-MM-DDTHH:MM:SSSSSSZ"

**Body:**
```json
{
  	"user_id": "3464941c-eb34-4bc8-83ef-673c3d829641",
  	"utc_datetime": "2016-12-19T19:27:00.066963Z"
}
```

**Response:**
```json
{
    "user_local_datetime": "2016-12-19T13:27:00.066963Z"
}
```

**Status Codes:**
- `200` if successful
- `400` is bad data is sent or user does not exist


### Hero Routes
After creating a user account and verifying their email, a user can apply to be a Hero.

#### Apply to be Hero

**POST:** `/api/v1/heroes/apply`

**Notes:**
- When a hero applies, each staff member will be sent an email with a link to the hero verification page
- `discipline`: choices are FE (front end), BE (back end), IO (iOS), AN (Android)
- `short_bio`: A very short bio of the individual (less than 200 characters)
- `years_of_exp`: The Hero's total years of experience. `years_of_exp` must be greater than or equal to all of the skill years.
- `rate_in_cents`: The Hero's rate in cents per minute. 1000 -> 10$/min
- `linkedin_url`: LinkedIn url for the user

**Body:**
```json
{
  	"discipline": "BE",
  	"title": "Set up a production level REST API with Django",
    "description": "This a further description of how I can help you with REST APIs with Django",
    "position": "Backend Engineer",
    "company": "SpaceX",
  	"short_bio": "This is short summary of myself",
  	"years_of_exp": 3,
  	"rate_in_cents": 100,
  	"linkedin_url": "http://www.django-rest-framework.org",
}
```

**Notes:**
- `accepted`: This is if the Hero has been accepted by staff, defaults to False
- `slug`: This field is used for the hero detail page url

**Response:**
```json
{
    "id": 1,
    "user": {
        "id": "085e8bbf-4430-4df8-9233-8269b52bd4bf",
        "first_name": "Tom",
        "last_name": "Brady",
        "profile_image": null,
        "timezone": "America/Chicago",
        "created": "2016-11-16T15:56:56.179930Z"
    },
    "slug": "tom-brady",
    "discipline": "BE",
    "title": "Set up a production level REST API with Django",
    "description": "This a further description of how I can help you with REST APIs with Django",
    "position": "Backend Engineer",
    "company": "SpaceX",
  	"short_bio": "This is short summary of myself",
    "years_of_exp": 3,
    "rate_in_cents": 100,
    "accepted": false,
    "linkedin_url": "http://www.django-rest-framework.org",
    "created": "2016-11-16T16:05:36.716298Z",
    "updated": "2016-11-16T18:44:27.964276Z"
}
```

**Status Codes:**
- `201` if successfully created
- `400` if incorrect data is provided
- `403` if user does not have a verified email and phone
- `409` if the email already exist


#### Get Hero profile

**GET:** `/api/v1/heroes/profile`

**Response:**
```json
{
    "id": 1,
    "user": {
        "id": "085e8bbf-4430-4df8-9233-8269b52bd4bf",
        "first_name": "Tom",
        "last_name": "Brady",
        "email": "bradytime@gmail.com",
        "email_verified": false,
        "email_notifications": false,
        "phone": "1234567890",
        "phone_verified": false,
        "profile_image": "https://media.licdn.com/mpr/mpr/shrink_100_100/p/5/005/040/0cd/008cf89.jpg",
        "is_active": false,
        "email_pending": null,
        "phone_pending": null,
        "timezone": "America/Chicago",
        "created": "2016-11-16T15:56:56.179930Z",
        "updated": "2016-11-16T17:05:00.423756Z"
    },
    "slug": "tom-brady",
    "discipline": "BE",
    "title": "Set up a production level REST API with Django",
    "description": "This a further description of how I can help you with REST APIs with Django",
    "position": "Backend Engineer",
    "company": "SpaceX",
  	"short_bio": "This is short summary of myself",
    "years_of_exp": 3,
    "rate_in_cents": 100,
    "accepted": false,
    "linkedin_url": "http://www.django-rest-framework.org",
    "active": true,
    "created": "2016-11-16T16:05:36.716298Z",
    "updated": "2016-11-16T18:44:27.964276Z"
}
```

**Status Codes:**
- `200` if successful
- `403` if no/incorrect token
- `404` if user does not exist


#### Update Hero profile

**PATCH:** `/api/v1/heroes/profile`

**Notes:**
- `active`: A boolean field. This is used to update a hero's account to inactive and active.

**Body:**
```json
{
  	"discipline": "FE",
    "title": "Set up a ReactJS sight",
    "description": "This a further description of how I can help you with ReactJS",
  	"short_bio": "This is short summary of myself",
  	"years_of_exp": 1,
  	"rate_in_cents": 0,
  	"linkedin_url": "http://www.django-rest-framework.org",
    "active": false,
}
```

**Response:**
```json
{
   "id": 1,
    "user": {
      "id": "085e8bbf-4430-4df8-9233-8269b52bd4bf",
      "first_name": "Tom",
      "last_name": "Brady",
      "email": "bradytime@gmail.com",
      "email_verified": false,
      "email_notifications": false,
      "phone": "1234567890",
      "phone_verified": false,
      "profile_image": "https://media.licdn.com/mpr/mpr/shrink_100_100/p/5/005/040/0cd/008cf89.jpg",
      "is_active": false,
      "email_pending": null,
      "phone_pending": null,
      "timezone": "America/Chicago",
      "created": "2016-11-16T15:56:56.179930Z",
      "updated": "2016-11-16T17:05:00.423756Z"
    },
    "slug": "tom-brady",
    "discipline": "FE",
    "title": "Set up a ReactJS sight",
    "description": "This a further description of how I can help you with ReactJS",
    "position": "Backend Engineer",
    "company": "SpaceX",
  	"short_bio": "This is short summary of myself",
    "years_of_exp": 1,
    "rate_in_cents": 0,
    "accepted": false,
    "linkedin_url": "http://www.django-rest-framework.org",
    "active": false,
    "created": "2016-11-16T16:05:36.716298Z",
    "updated": "2016-11-16T18:50:13.282186Z"
}
```

**Status Codes:**
- `200` if successful
- `400` if incorrect data is provided
- `403` if user is not authorized or verified


#### Accept Hero

**POST:** `/api/v1/heroes/accept`

**Notes:**
- When a staff member accepts a hero, an email will be sent to the hero.
- `hero_id`: the hero's id (UUID)
- The user must be a staff member

**Body:**
```json
{
  	"hero_id": 1
}
```

**Response:**
```json
{
    "user": "fd6494d8-e684-4f4b-960c-c83f56d1d790",
    "hero": 1,
    "accepted": true,
    "timestamp": "2016-11-17T22:05:52.093318Z"
}
```

**Status Codes:**
- `200` if successful
- `400` if incorrect data is provided
- `403` if the user is not staff


#### Decline Hero

**POST:** `/api/v1/heroes/decline`

**Notes:**
- `hero_id`: the hero's id (UUID)
- The user must be a staff member

**Body:**
```json
{
  	"hero_id": 1
}
```

**Response:**
```json
{
    "user": "fd6494d8-e684-4f4b-960c-c83f56d1d790",
    "hero": 1,
    "accepted": false,
    "timestamp": "2016-11-17T22:06:50.108634Z"
}
```

**Status Codes:**
- `200` if successful
- `400` if incorrect data is provided
- `403` if the user is not staff


#### Get Hero list

**GET:** `/api/v1/heroes/`

**Notes:**
- This lists all the heroes that have been accepted by staff.
- This route is allowed by an anon user

**Response:**
```json
{
  "count": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "user": {
        "id": "878d0570-4763-41f9-b122-bc46e444d62d",
        "first_name": "Clark",
        "last_name": "Kent",
        "profile_image": "https://media.licdn.com/mpr/mpr/shrink_100_100/p/5/005/040/0cd/008cf89.jpg",
        "timezone": "America/Chicago",
        "created": "2016-11-17T22:28:42.769133Z"
      },
      "slug": "clark-kent",
      "discipline": "FE",
      "title": "Set up a ReactJS sight",
      "description": "This a further description of how I can help you with ReactJS",
      "position": "Backend Engineer",
      "company": "SpaceX",
      "years_of_exp": 10,
      "rate_in_cents": 500,
      "created": "2016-11-17T22:29:31.790223Z",
      "updated": "2016-11-30T02:46:51.584685Z"
    },
    {
      "id": 2,
      "user": {
        "id": "7ee66bfc-02a6-42ac-a488-affd5105d5a1",
        "first_name": "Tech",
        "last_name": "Hero",
        "profile_image": "https://media.licdn.com/mpr/mpr/shrink_100_100/p/5/005/040/0cd/008cf89.jpg",
        "timezone": "America/Chicago",
        "created": "2016-11-17T21:55:27.410554Z"
      },
      "slug": "tech-hero",
      "discipline": "BE",
      "title": "Set up a production level REST API with Django",
      "description": "This a further description of how I can help you with REST APIs with Django",
      "position": "Backend Engineer",
      "company": "SpaceX",
      "years_of_exp": 3,
      "rate_in_cents": 100,
      "created": "2016-11-17T21:56:53.935553Z",
      "updated": "2016-11-30T02:46:51.584685Z"
    }
  ]
}
```

**Status Codes:**
- `200` if successful


#### Get Hero detail

**GET:** `/api/v1/heroes/:hero_id`

**Notes:**
- This retrieves the hero's details that the user can see.
- This route is allowed by an anon user

**Response:**
```json
{
   "id": 1,
    "user": {
      "id": "085e8bbf-4430-4df8-9233-8269b52bd4bf",
      "first_name": "Tom",
      "last_name": "Brady",
      "profile_image": "https://media.licdn.com/mpr/mpr/shrink_100_100/p/5/005/040/0cd/008cf89.jpg",
      "timezone": "America/Chicago",
      "created": "2016-11-16T15:56:56.179930Z"
    },
    "slug": "tom-brady",
    "discipline": "BE",
    "title": "Set up a production level REST API with Django",
    "description": "This a further description of how I can help you with REST APIs with Django",
    "position": "Backend Engineer",
    "company": "SpaceX",
  	"short_bio": "This is short summary of myself",
    "years_of_exp": 1,
    "rate_in_cents": 0,
    "linkedin_url": "http://www.django-rest-framework.org",
    "active": false,
    "created": "2016-11-16T16:05:36.716298Z",
    "updated": "2016-11-30T02:46:51.584685Z"
}
```

**Status Codes:**
- `200` if successful
- `404` if hero with provided id is not found


### Call Request Routes
Call requests are what users make to any hero they desire. The user has to be authenticated, have a verified email and phone and a verified form of payment.

#### Create a call request

**POST:** `/api/v1/call-requests/`

**Notes:**
- `hero_id`: the hero's id (UUID)
- `message`: a summary or reason for the call
- `estimated_length`: the approximate time for the call in minutes (must be in 15 min interval with a max of 120)

**Body:**
```json
{
  	"hero_id": 1,
    "message": "This is a general summary or reason for the call",
    "estimated_length": 15
}
```

**Notes:**
- `status`: the status of the call request. Can either be `o`, `a` or `d` for `open`, `accepted` or `declined` respectively.

**Response:**
```json
{
    "id": 1,
    "user": "fd6494d8-e684-4f4b-960c-c83f56d1d790",
    "hero": 1,
    "message": "This is a general summary or reason for the call",
    "estimated_length": 15,
    "status": "o",
    "reason": "",
    "times": [],
    "agreed_time": null,
    "created": "2016-11-17T22:06:50.108634Z",
    "updated": "2016-11-17T22:06:50.108634Z"
}
```

**Status Codes:**
- `200` if successful
- `400` if incorrect data is provided
- `403` if the user is not authenticated or email/phone is unverified or no payment verified


#### Accept a call request

**PATCH:** `/api/v1/call-requests/:call_request_id/accept/`

**Notes:**
- The user must be a hero
- `time_one`, `time_two`, `time_three`: Are all UTC datetimes. All times should all be at least 30 min ahead and may only be requested in 15 min intervals.
- The status then changes from `o` (open) to `a` (accepted)

**Body:**
```json
{
    "time_one": "2016-11-17T22:06:00.000000Z",
    "time_two": "2016-11-17T22:06:30.000000Z",
    "time_three": "2016-11-17T22:07:00.000000Z",
}
```

**Response:**
```json
{
    "id": 1,
    "user": "fd6494d8-e684-4f4b-960c-c83f56d1d790",
    "hero": 1,
    "message": "This is a general summary or reason for the call",
    "estimated_length": 15,
    "status": "a",
    "reason": "",
    "times": [
      {
       "user": {
         "id": "b6513c6f-e3b5-4c00-ae10-1b78950d8c8a",
         "first_name": "Tom",
         "last_name": "Brady",
         "profile_image": "https://media.licdn.com/mpr/mpr/shrink_100_100/p/5/005/040/0cd/008cf89.jpg",
         "timezone": "America/Chicago",
         "created": "2016-12-03T00:23:57.364198Z"
       },
       "datetime_one": "2017-12-25T06:00:00.000000Z",
       "datetime_two": "2017-12-25T07:30:00.000000Z",
       "datetime_three": "2017-12-25T08:30:00.000000Z",
       "timestamp": "2016-12-05T17:04:23.659493Z"
      },
    ],
    "agreed_time": null,
    "created": "2016-11-17T22:06:50.108634Z",
    "updated": "2016-12-05T17:19:58.206376Z"
}
```

**Status Codes:**
- `200` if successful
- `400` if incorrect data is provided
- `403` if the user is not a hero


#### Decline a call request

**PATCH:** `/api/v1/call-requests/:call_request_id/decline/`

**Notes:**
- The user must be a hero
- `reason`: A charfield describing why the request was declined (only required if call request is declined)
- The status changes from `o` (open) to `d` (declined)

**Body:**
```json
{
    "reason": "Not comfortable talking about this subject."
}
```

**Response:**
```json
{
    "id": 1,
    "user": "fd6494d8-e684-4f4b-960c-c83f56d1d790",
    "hero": 1,
    "message": "This is a general summary or reason for the call",
    "estimated_length": 15,
    "status": "d",
    "reason": "Not comfortable talking about this subject.",
    "times": [],
    "agreed_time": null,
    "created": "2016-11-17T22:06:50.108634Z",
    "updated": "2016-12-05T17:19:58.206376Z"
}
```

**Status Codes:**
- `200` if successful
- `400` if incorrect data is provided
- `403` if the user is not a hero


#### Suggest new times

**PATCH:** `/api/v1/call-requests/:call_request_id/new-times/`

**Notes:**
- The user can be user or hero
- `time_one`, `time_two`, `time_three`: Are all UTC datetimes. All times should all be at least 30 min ahead and may only be requested in 15 min intervals.

**Body:**
```json
{
    "time_one": "2017-12-25T10:00:00.000000Z",
    "time_two": "2017-12-25T11:30:00.000000Z",
    "time_three": "2017-12-25T12:30:00.000000Z"
}
```

**Response:**
```json
{
    "id": 1,
    "user": "fd6494d8-e684-4f4b-960c-c83f56d1d790",
    "hero": 1,
    "message": "This is a general summary or reason for the call",
    "estimated_length": 15,
    "status": "a",
    "reason": "",
    "times": [
      {
       "user": {
         "id": "b6513c6f-e3b5-4c00-ae10-1b78950d8c8a",
         "first_name": "Tom",
         "last_name": "Brady",
         "profile_image": "https://media.licdn.com/mpr/mpr/shrink_100_100/p/5/005/040/0cd/008cf89.jpg",
         "timezone": "America/Chicago",
         "created": "2016-12-03T00:23:57.364198Z"
       },
       "datetime_one": "2017-12-25T06:00:00.000000Z",
       "datetime_two": "2017-12-25T07:30:00.000000Z",
       "datetime_three": "2017-12-25T08:30:00.000000Z",
       "timestamp": "2016-12-05T17:04:23.659493Z"
      },
      {
        "user": {
          "id": "90bad282-b2ac-48d7-b18b-2b4ad2e33007",
          "first_name": "Some",
          "last_name": "User",
          "profile_image": "https://media.licdn.com/mpr/mpr/shrink_100_100/p/5/005/040/0cd/008cf89.jpg",
          "timezone": "America/Chicago",
          "created": "2016-12-05T16:29:36.676173Z"
        },
        "datetime_one": "2017-12-25T10:00:00.000000Z",
        "datetime_two": "2017-12-25T11:30:00.000000Z",
        "datetime_three": "2017-12-25T12:30:00.000000Z",
        "timestamp": "2016-12-05T17:43:42.067673Z"
      },
    ],
    "agreed_time": null,
    "created": "2016-11-17T22:06:50.108634Z"
}
```

**Status Codes:**
- `200` if successful
- `400` if incorrect data is provided
- `403` if the user is not authenticated
- `409` if the datetime already exists


#### Accept time

**PATCH:** `/api/v1/call-requests/:call_request_id/agreed-time/`

**Notes:**
- After a user accepts a time for the call, a text message is scheduled to be sent 15 minutes before the call time for both the hero and the user.
- `agreed_time`: This is the final agreed_time by either the user or the hero (both users can make time requests back and forth). A null `agreed_time` means that no time has been agreed upon yet.

**Body:**
```json
{
  	"agreed_time": "2016-11-17T22:06:00.000000Z"
}
```

**Response:**
```json
{
    "id": 1,
    "user": "fd6494d8-e684-4f4b-960c-c83f56d1d790",
    "hero": 1,
    "message": "This is a general summary or reason for the call",
    "estimated_length": 15,
    "status": "a",
    "reason": "",
    "times": [
      {
       "user": {
         "id": "b6513c6f-e3b5-4c00-ae10-1b78950d8c8a",
         "first_name": "Tom",
         "last_name": "Brady",
         "profile_image": "https://media.licdn.com/mpr/mpr/shrink_100_100/p/5/005/040/0cd/008cf89.jpg",
         "timezone": "America/Chicago",
         "created": "2016-12-03T00:23:57.364198Z"
       },
       "datetime_one": "2017-12-25T06:00:00.000000Z",
       "datetime_two": "2017-12-25T07:30:00.000000Z",
       "datetime_three": "2017-12-25T08:30:00.000000Z",
       "timestamp": "2016-12-05T17:04:23.659493Z"
     },
    ],
    "agreed_time": "2016-11-17T22:06:00.000000Z",
    "created": "2016-11-17T22:06:50.108634Z",
    "updated": "2016-12-05T17:37:05.617390Z"
}
```

**Status Codes:**
- `200` if successful
- `400` if incorrect data is provided
- `403` if the user is not a hero


#### Get Call Request list

**GET:** `/api/v1/call-requests/`

**Response:**
```json
{
  "count": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "user": "fd6494d8-e684-4f4b-960c-c83f56d1d790",
      "hero": 1,
      "message": "This is a general summary or reason for the call",
      "estimated_length": 15,
      "status": "a",
      "reason": "",
      "times": [
        {
         "user": {
           "id": "b6513c6f-e3b5-4c00-ae10-1b78950d8c8a",
           "first_name": "Tom",
           "last_name": "Brady",
           "profile_image": "https://media.licdn.com/mpr/mpr/shrink_100_100/p/5/005/040/0cd/008cf89.jpg",
           "timezone": "America/Chicago",
           "created": "2016-12-03T00:23:57.364198Z"
         },
         "datetime_one": "2017-12-25T06:00:00.000000Z",
         "datetime_two": "2017-12-25T07:30:00.000000Z",
         "datetime_three": "2017-12-25T08:30:00.000000Z",
         "timestamp": "2016-12-05T17:04:23.659493Z"
       },
      ],
      "agreed_time": "2016-11-17T22:06:00.000000Z",
      "created": "2016-11-17T22:06:50.108634Z",
      "updated": "2016-12-05T17:37:05.617390Z"
    },
    ...
  ]
}
```

**Status Codes:**
- `200` if successful
- `403` if unauthenticated


#### Get Call Request detail

**GET:** `/api/v1/call-requests/:call_request_id`

**Response:**
```json
{
    "id": 1,
    "user": "fd6494d8-e684-4f4b-960c-c83f56d1d790",
    "hero": 1,
    "message": "This is a general summary or reason for the call",
    "estimated_length": 15,
    "status": "a",
    "reason": "",
    "times": [
      {
       "user": {
         "id": "b6513c6f-e3b5-4c00-ae10-1b78950d8c8a",
         "first_name": "Tom",
         "last_name": "Brady",
         "profile_image": "https://media.licdn.com/mpr/mpr/shrink_100_100/p/5/005/040/0cd/008cf89.jpg",
         "timezone": "America/Chicago",
         "created": "2016-12-03T00:23:57.364198Z"
       },
       "datetime_one": "2017-12-25T06:00:00.000000Z",
       "datetime_two": "2017-12-25T07:30:00.000000Z",
       "datetime_three": "2017-12-25T08:30:00.000000Z",
       "timestamp": "2016-12-05T17:04:23.659493Z"
     },
    ],
    "agreed_time": "2016-11-17T22:06:00.000000Z",
    "created": "2016-11-17T22:06:50.108634Z",
    "updated": "2016-12-05T17:37:05.617390Z"
}
```

**Status Codes:**
- `200` if successful
- `403` if the user is not the user or hero in call request
- `404` if call request with provided id is not found


#### Cancel a Call Request

**PATCH:** `/api/v1/call-requests/:call_request_id/cancel/`

**Notes:**
- `reason`: A reason for canceling the call
- `force`: A boolean field allowing the cancelation to be made even though the user has surpassed their allowed cancelation number. This might be used if they user decides to pay a fee.

**Body:**
```json
{
  	"reason": "I have to cancel because I have better things to do.",
    "force": true
}
```

**Response:**
```json
{
    "id": 1,
    "user": "fd6494d8-e684-4f4b-960c-c83f56d1d790",
    "hero": 1,
    "message": "This is a general summary or reason for the call",
    "estimated_length": 15,
    "status": "c",
    "reason": "",
    "times": [
      {
       "user": {
         "id": "b6513c6f-e3b5-4c00-ae10-1b78950d8c8a",
         "first_name": "Tom",
         "last_name": "Brady",
         "profile_image": "https://media.licdn.com/mpr/mpr/shrink_100_100/p/5/005/040/0cd/008cf89.jpg",
         "timezone": "America/Chicago",
         "created": "2016-12-03T00:23:57.364198Z"
       },
       "datetime_one": "2017-12-25T06:00:00.000000Z",
       "datetime_two": "2017-12-25T07:30:00.000000Z",
       "datetime_three": "2017-12-25T08:30:00.000000Z",
       "timestamp": "2016-12-05T17:04:23.659493Z"
     },
    ],
    "agreed_time": "2016-11-17T22:06:00.000000Z",
    "created": "2016-11-17T22:06:50.108634Z",
    "updated": "2016-12-05T17:37:05.617390Z"
}
```

**Status Codes:**
- `200` if successful
- `403` if the user is not the user or hero in call request
- `404` if call request with provided id is not found
- `409` if the user has canceled too many times


### Conference Routes
Conferences are created when a user and a hero dial into a twilio number.


#### Get Conference list

**GET:** `/api/v1/conferences/`

**Notes:**
- `sid`: A 34 long UUID that is the same as twilio's conference sid.
- `friendly_name`: This is a human readable name of the conference room. This will always be the Hero's slug
- `call_request`: A summary of the call request instance tied to this conference

**Response:**
```json
{
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
      {
        "sid": "CFdb5091db95f242da69ca93bbc07b151d",
        "friendly_name": "tom-brady",
        "call_request": {
          "id": 1,
          "user": "Cam Newton",
          "hero": "Tom Brady",
          "message": "Yo Brady teach me how to throw!",
          "estimated_length": 120,
          "agreed_time": "2016-12-23T17:30:53.982848Z"
        },
        "created": "2016-12-23T17:17:08.921561Z"
      },
      ...
    ]
}
```

**Status Codes:**
- `200` if successful
- `403` if unauthenticated


#### Get Conference detail

**GET:** `/api/v1/conferences/:conference_id`

**Notes:**
- `logs`: This contains all the logs for the conference. What time each participant joined & left and what time the conference started & stopped.

**Response:**
```json
{
    "sid": "CFdb5091db95f242da69ca93bbc07b151d",
    "friendly_name": "tom-brady",
    "call_request": {
      "id": 1,
      "user": "Cam Newton",
      "hero": "Tom Brady",
      "message": "Yo Brady teach me how to throw!",
      "estimated_length": 120,
      "agreed_time": "2016-12-23T17:30:53.982848Z"
    },
    "logs": [
      {
        "user": "Cam Newton",
        "action": "participant-join",
        "timestamp": "2016-12-23T17:17:08.927306Z"
      },
      {
        "user": "Tom Brady",
        "action": "participant-join",
        "timestamp": "2016-12-23T17:17:18.364428Z"
      },
      {
        "user": "Conference Log",
        "action": "conference-start",
        "timestamp": "2016-12-23T17:17:18.416721Z"
      },
      {
        "user": "Tom Brady",
        "action": "participant-leave",
        "timestamp": "2016-12-23T17:17:30.828315Z"
      },
      {
        "user": "Cam Newton",
        "action": "participant-leave",
        "timestamp": "2016-12-23T17:17:52.513241Z"
      },
      {
        "user": "Conference Log",
        "action": "conference-end",
        "timestamp": "2016-12-23T17:17:54.188925Z"
      }
    ],
    "created": "2016-12-23T17:17:08.921561Z"
}
```

**Status Codes:**
- `200` if successful
- `403` if the user is not in conference
- `404` if not found
