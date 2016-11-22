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

#### User Routes
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

#### Hero Routes
- [Apply to be Hero](#apply-to-be-hero)
- [Get Hero profile](#get-hero-profile)
- [Update Hero profile](#update-hero-profile)
- [Accept Hero](#accept-hero)
- [Decline Hero](#decline-hero)
- [Get Hero list](#get-hero-list)
- [Retrieve Hero detail](#retrieve-hero-detail)

#### Call Request Routes
- [Create a Hero request](#get-hero-list)


## API Routes


### User Routes
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
    "email_pending": "test@test.com",
    "phone_pending": null,
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
    "email_notifications": false,
    "phone": null,
    "phone_verified": false,
    "profile_image": null,
    "is_active": false,
    "email_pending": "test@test.com",
    "phone_pending": null,
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
    "email_pending": "test@test.com",
    "phone_pending": null,
    "created": "2016-11-16T15:56:56.179930Z",
    "updated": "2016-11-16T15:59:09.189275Z"
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
- `email_pending`: this is the email that is awaiting to be saved for the user once they verify
- When a user updates `phone`, the user will receive a verification text. `phone_verified` will remain false and `phone` will remain null until the user verifies their phone token.
- `phone_pending`: this is the phone number that is awaiting to be saved for the user once they verify
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
    "phone": null,
    "phone_verified": false,
    "profile_image": "https://media.licdn.com/mpr/mpr/shrink_100_100/p/5/005/040/0cd/008cf89.jpg",
    "is_active": false,
    "email_pending": "test@test.com",
    "phone_pending": "1234567890",
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

**Body:**
```json
{
    "token": "12dfg2wer6",
}
```

**Notes:**
- `token`: Email verification tokens are 10 character combinations of lowercase letters and digits
- Once the email is verified `email_pending` becomes null and `email_verified` becomes true

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

**Body:**
```json
{
    "token": "abc123",
}
```

**Notes:**
- `token`: Phone verification tokens are 6 character combinations of lowercase letters and digits
- Once the phone is verified `phone_pending` becomes null and `phone_verified` becomes true

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

**Body:**
```json
{
    "token": "12dfg2we",
    "new_password": "newpass1"
}
```

**Notes:**
- This route resets a user's password and logs them in
- `token`: verification token is a 8 character combinations of lowercase letters and digits
- `new_password`: must be at least 8 chars with at least 1 number

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
    "created": "2016-11-16T15:56:56.179930Z",
    "updated": "2016-11-16T17:02:27.978451Z",
    "token": "ccf66788480947c48e7c7a3eb168ee12"
}
```

**Status Codes:**
- `200` if successful
- `400` is bad data is sent
- `404` if the password token is invalid or expired


### Hero Routes
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
    "id": "b55dcf4a-e723-495e-b920-738c4b6d221d",
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
    "id": "b55dcf4a-e723-495e-b920-738c4b6d221d",
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
   "id": "b55dcf4a-e723-495e-b920-738c4b6d221d",
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


#### Accept Hero

**POST:** `/api/v1/heroes/accept`

**Body:**
```json
{
  	"hero_id":"b55dcf4a-e723-495e-b920-738c4b6d221d"
}
```

**Notes:**
- `hero_id`: the hero's id (UUID)
- The user must be a staff member

**Response:**
```json
{
    "user": "fd6494d8-e684-4f4b-960c-c83f56d1d790",
    "hero": "b55dcf4a-e723-495e-b920-738c4b6d221d",
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

**Body:**
```json
{
  	"hero_id":"b55dcf4a-e723-495e-b920-738c4b6d221d"
}
```

**Notes:**
- `hero_id`: the hero's id (UUID)
- The user must be a staff member

**Response:**
```json
{
    "user": "fd6494d8-e684-4f4b-960c-c83f56d1d790",
    "hero": "b55dcf4a-e723-495e-b920-738c4b6d221d",
    "accepted": false,
    "timestamp": "2016-11-17T22:06:50.108634Z"
}
```

**Status Codes:**
- `200` if successful
- `400` if incorrect data is provided
- `403` if the user is not staff


#### Get Hero list

**GET:** `/api/v1/heroes/list`

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
      "id": "ab8996b5-edd5-40d0-bc90-ed8b578df9d5",
      "user": {
        "id": "878d0570-4763-41f9-b122-bc46e444d62d",
        "first_name": "Clark",
        "last_name": "Kent",
        "created": "2016-11-17T22:28:42.769133Z"
      },
      "discipline": "FE",
      "short_bio": "I am an awesome front end engineer!",
      "resume": "This is my resume",
      "years_of_exp": 10,
      "rate_in_cents": 500,
      "skills": [
        {
          "name": "Javascript",
          "years": 10
        },
        {
          "name": "Django",
          "years": 5
        },
        {
          "name": "ReactJS",
          "years": 9
        }
      ],
      "linkedin_url": "http://www.django-rest-framework.org",
      "created": "2016-11-17T22:29:31.790223Z"
    },
    {
      "id": "b55dcf4a-e723-495e-b920-738c4b6d221d",
      "user": {
        "id": "7ee66bfc-02a6-42ac-a488-affd5105d5a1",
        "first_name": "Tech",
        "last_name": "Hero",
        "created": "2016-11-17T21:55:27.410554Z"
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
      "linkedin_url": "http://www.django-rest-framework.org",
      "created": "2016-11-17T21:56:53.935553Z"
    }
  ]
}
```

**Status Codes:**
- `200` if successful


#### Retrieve Hero detail

**GET:** `/api/v1/heroes/:hero_id`

**Notes:**
- This retrieves the hero's details that the user can see.
- This route is allowed by an anon user

**Response:**
```json
{
   "id": "b55dcf4a-e723-495e-b920-738c4b6d221d",
    "user": {
      "id": "085e8bbf-4430-4df8-9233-8269b52bd4bf",
      "first_name": "Tom",
      "last_name": "Brady",
      "email": "bradytime@gmail.com",
      "profile_image": "https://media.licdn.com/mpr/mpr/shrink_100_100/p/5/005/040/0cd/008cf89.jpg",
      "created": "2016-11-16T15:56:56.179930Z"
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
    "linkedin_url": "http://www.django-rest-framework.org",
    "created": "2016-11-16T16:05:36.716298Z",
}
```

**Status Codes:**
- `200` if successful
- `404` if hero with provided id is not found


### Call Request Routes
Call requests are what users make to any hero they desire. The user has to have a verified email and verified phone before they can make a call request.

#### Create a call request

**POST:** `/api/v1/call-request/`

**Body:**
```json
{
  	"hero_id":"b55dcf4a-e723-495e-b920-738c4b6d221d",
    "message": "This is a general summary or reason for the call",
    "estimated_length": 15,
    "datetime_one": "2016-11-17T22:06:00.000000Z",
    "datetime_two": "2016-11-17T22:06:15.000000Z",
    "datetime_three": "2016-11-17T22:06:30.000000Z"
}
```

**Notes:**
- `hero_id`: the hero's id (UUID)
- `message`: a summary or reason for the call
- `estimated_length`: the approximate time for the call in minutes
- `datetime_one`, `datetime_two` and `datetime_three` are UTC datetimes the user suggested for the call

**Response:**
```json
{
    "id": 1,
    "user": "fd6494d8-e684-4f4b-960c-c83f56d1d790",
    "hero": "b55dcf4a-e723-495e-b920-738c4b6d221d",
    "message": "This is a general summary or reason for the call",
    "estimated_length": 15,
    "datetime_one": "2016-11-17T22:06:00.000000Z",
    "datetime_two": "2016-11-17T22:06:15.000000Z",
    "datetime_three": "2016-11-17T22:06:30.000000Z",
    "expired": false,
    "created": "2016-11-17T22:06:50.108634Z"
}
```

**Status Codes:**
- `200` if successful
- `400` if incorrect data is provided
- `403` if the user is not staff

