## Conference API Routes

### Conference Notes
Conferences are created when a user and a hero dial into a twilio number.


#### Conference Table of Contents
- [Get Conference list](#get-conference-list)
- [Get Conference detail](#get-conference-detail)


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