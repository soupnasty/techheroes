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
- [Verify a users email](#verify-a-users-email)
- [Verify a users phone](#verify-a-users-phone)
- [Change the users password](#change-the-users-password)
- [Request a password reset](#request-a-password-reset)
- [Reset a users password](#reset-a-users-password)

#### Heroes
- [Apply to be Hero](#apply-to-be-hero)
- [Get Hero profile](#get-hero-profile)
- [Update Hero profile](#update-hero-profile)


## API Routes


### Users
Users only require first_name, last_name, email and password to create an account. After creating an account, a user will have to verify their email address by clicking a link sent to their email (EMAIL VERIFICATION HAS NOT BEEN IMPLEMENTED YET). This applies to both Heroes and Users.

#### Register a new user

**POST:** `/api/v1/accounts/register`

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

**Response:**
```json
{
    "id": "085e8bbf-4430-4df8-9233-8269b52bd4bf",
    "first_name": "Cam",
    "last_name": "Newton",
    "email": "test@test.com",
    "email_verified": false,
    "email_notifications": false,
    "phone": null,
    "phone_verified": false,
    "profile_image": null,
    "is_active": false,
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
    "password": "password1"
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
    "email_notifications": false,
    "phone": null,
    "phone_verified": false,
    "profile_image": null,
    "is_active": false,
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
    "email_notifications": false,
    "phone": null,
    "phone_verified": false,
    "profile_image": null,
    "is_active": false,
    "created": "2016-11-16T15:56:56.179930Z",
    "updated": "2016-11-16T15:59:09.189275Z",
    "token": "ccf66788480947c48e7c7a3eb168ee12"
}
```

**Status Codes:**
- `200` if successful
- `403` if no/incorrect token
- `404` if user does not exist


#### Update the users profile

**PATCH:** `/api/v1/accounts/profile`

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

**Notes:**
- `phone`: A ten-digit US phone number as string
- When a user updates `email`, the user will receive a verification email. `email_verified` will remain false and `email` will remain their old email until the user verifies their email token.
- When a user updates `phone`, the user will receive a verification text. `phone_verified` will remain false and `phone` will remain null until the user verifies their phone token.
- `profile_image` is a image url link

**Response:**
```json
{
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
    "created": "2016-11-16T15:56:56.179930Z",
    "updated": "2016-11-16T17:02:27.978451Z",
    "token": "ccf66788480947c48e7c7a3eb168ee12"
}
```

**Status Codes:**
- `200` if successful
- `400` if incorrect data is provided
- `403` if user is not authorized or verified


#### Verify a users email

**POST:** `/api/v1/accounts/verify-email` (NOT COMPLETE YET)

**Body:**
```json
{
    "code": "12dfg2wer6a342g23456",
}
```

**Notes:**
- `code`: Email verification codes are 20 character combinations of lowercase letters and digits

**Response:**
```json
{
    "id": "085e8bbf-4430-4df8-9233-8269b52bd4bf",
    "first_name": "Tom",
    "last_name": "Brady",
    "email": "bradytime@gmail.com",
    "email_verified": true,
    "email_notifications": false,
    "phone": "1234567890",
    "phone_verified": false,
    "profile_image": "https://media.licdn.com/mpr/mpr/shrink_100_100/p/5/005/040/0cd/008cf89.jpg",
    "is_active": false,
    "created": "2016-11-16T15:56:56.179930Z",
    "updated": "2016-11-16T17:02:27.978451Z",
    "token": "ccf66788480947c48e7c7a3eb168ee12"
}
```

**Status Codes:**
- `200` if successful
- `400` is bad data is sent
- `403` if user is not authenticated
- `404` if the code is invalid or expired


#### Verify a users phone

**POST:** `/api/v1/accounts/verify-phone` (NOT COMPLETE YET)

**Body:**
```json
{
    "code": "abc123",
}
```

**Notes:**
- `code`: Phone verification codes are 6 character combinations of lowercase letters and digits

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
    "created": "2016-11-16T15:56:56.179930Z",
    "updated": "2016-11-16T17:02:27.978451Z",
    "token": "ccf66788480947c48e7c7a3eb168ee12"
}
```

**Status Codes:**
- `200` if successful
- `400` is bad data is sent
- `403` if user is not authenticated
- `404` if the code is invalid or expired


#### Change the users password

**POST:** `/api/v1/accounts/change-password` (NOT COMPLETE YET)

**Body:**
```json
{
    "old_password": "oldpass1",
    "new_password": "newpass1"
}
```

**Notes:**
- `old_password`: must be at least 8 chars with at least 1 number
- `new_password`: must be at least 8 chars with at least 1 number

**Response:** None

**Status Codes:**
- `200` if successful
- `400` if invalid data is provided, or `old_password` doesn't match
- `403` if user is not authenticated


#### Request a password reset

**POST:** `/api/v1/accounts/request-password` (NOT COMPLETE YET)

**Body:**
```json
{
    "email": "test@test.com",
}
```

**Notes:**
- `email` can be any valid email address. The reset code will be emailed to the user.

**Response:** None

**Status Codes:**
- `200` if successful
- `400` is bad data is sent
- `404` if the email is not found


#### Reset a users password

**POST:** `/api/v1/accounts/reset-password` (NOT COMPLETE YET)

**Body:**
```json
{
    "token": "12dfg2wer6a342g23456",
    "new_password": "newpass1"
}
```

**Notes:**
- `password`: must be at least 8 chars with at least 1 number
- `token`: verification token is a 20 character combinations of lowercase letters and digits

**Response:** None

**Status Codes:**
- `200` if successful
- `400` is bad data is sent
- `404` if the token is invalid or expired


### Heros
After creating a user account and verifying their email, a user can apply to be a Hero.

#### Apply to be Hero

**POST:** `/api/v1/heroes/apply`

**Body:**
```json
{
  	"discipline": "BE",
  	"short_bio": "I am an awesome backend engineer!",
  	"resume": "This is my resume",
  	"years_of_exp": 3,
  	"rate_in_cents": 100,
  	"linkedin_url": "http://www.django-rest-framework.org",
  	"skills": [
  		{
  			"name": "Python",
  			"years": 2
  		},
  		{
  			"name": "Django",
  			"years": 2
  		},
  		{
  			"name": "ReactJS",
  			"years": 2

  		}
  	]
}
```

**Notes:**
- `discipline`: choices are FE (front end), BE (back end), IO (iOS), AN (Android) and UX (UX design)
- `short_bio`: A very short bio of the individual (less than 200 characters)
- `resume`: A text field that holds a summary of the Hero's resume
- `years_of_exp`: The Hero's total years of experience
- `rate_in_cents`: The Hero's rate in cents per minute. 1000 -> 10$/min
- `linkedin_url`: LinkedIn url for the user
- `skills`: JSON object of user's skills (3 required)

**Response:**
```json
{
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
        "created": "2016-11-16T15:56:56.179930Z",
        "updated": "2016-11-16T17:05:00.423756Z",
        "token": "ccf66788480947c48e7c7a3eb168ee12"
    },
    "discipline": "BE",
    "short_bio": "I am an awesome backend engineer!",
    "resume": "This is my resume",
    "years_of_exp": 3,
    "rate_in_cents": 100,
    "skills": [
      {
        "name": "Python",
        "years": 2
      },
      {
        "name": "Django",
        "years": 2
      },
      {
        "name": "ReactJS",
        "years": 2
      }
    ],
    "accepted": false,
    "linkedin_url": "http://www.django-rest-framework.org",
    "created": "2016-11-16T16:05:36.716298Z",
    "updated": "2016-11-16T18:44:27.964276Z"
}
```

**Notes:**
- `accepted`: This is if the Hero has been accepted by staff, defaults to False

**Status Codes:**
- `201` if successfully created
- `400` if incorrect data is provided
- `409` if the email already exist


#### Get Hero profile

**GET:** `/api/v1/heroes/profile`

**Response:**
```json
{
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
        "created": "2016-11-16T15:56:56.179930Z",
        "updated": "2016-11-16T17:05:00.423756Z",
        "token": "ccf66788480947c48e7c7a3eb168ee12"
    },
    "discipline": "BE",
    "short_bio": "I am an awesome backend engineer!",
    "resume": "This is my resume",
    "years_of_exp": 3,
    "rate_in_cents": 100,
    "skills": [
      {
        "name": "Python",
        "years": 2
      },
      {
        "name": "Django",
        "years": 2
      },
      {
        "name": "ReactJS",
        "years": 2
      }
    ],
    "accepted": false,
    "linkedin_url": "http://www.django-rest-framework.org",
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

**Body:**
```json
{
  	"discipline": "UX",
  	"short_bio": "I switched to UX",
  	"resume": "This is my resume",
  	"years_of_exp": 1,
  	"rate_in_cents": 0,
  	"linkedin_url": "http://www.django-rest-framework.org",
  	"skills": [
  		{
  			"name": "Photoshop",
  			"years": 1
  		},
  		{
  			"name": "Lightroom",
  			"years": 1
  		},
  		{
  			"name": "HTML",
  			"years": 1

  		}
  	]
}
```

**Response:**
```json
{
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
      "created": "2016-11-16T15:56:56.179930Z",
      "updated": "2016-11-16T17:05:00.423756Z",
      "token": "ccf66788480947c48e7c7a3eb168ee12"
    },
    "discipline": "UX",
    "short_bio": "I switched to UX",
    "resume": "This is my resume",
    "years_of_exp": 1,
    "rate_in_cents": 0,
    "skills": [
      {
        "name": "Photoshop",
        "years": 1
      },
      {
        "name": "Lightroom",
        "years": 1
      },
      {
        "name": "HTML",
        "years": 1
      }
    ],
    "accepted": false,
    "linkedin_url": "http://www.django-rest-framework.org",
    "created": "2016-11-16T16:05:36.716298Z",
    "updated": "2016-11-16T18:50:13.282186Z"
}
```

**Status Codes:**
- `200` if successful
- `400` if incorrect data is provided
- `403` if user is not authorized or verified
