## Call Request API Routes

### Call Requests Notes
Call requests are what users make to any hero they desire. The user has to be authenticated, have a verified email and phone and a verified form of payment.


#### Call Request Table of Contents
- [Create a call request](#create-a-call-request)
- [Accept a call request](#accept-a-call-request)
- [Decline a call request](#decline-a-call-request)
- [Suggest new times](#suggest-new-times)
- [Accept time](#accept-time)
- [Get Call Request list](#get-call-request-list)
- [Get Call Request detail](#get-call-request-detail)
- [Cancel a Call Request](#cancel-a-call-request)


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