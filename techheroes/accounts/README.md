## User API Routes

### User Notes
Users require a first_name, last_name, email, password, phone, phone_token and timezone to create an account. After creating an account, a user will have to verify their email address by clicking a link sent to their email. This applies to both Heroes and Users.


#### User Table of Contents
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