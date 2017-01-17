## Hero API Routes

### Hero Notes
After creating a user account and verifying their email, a user can apply to be a Hero.


#### Hero Table of Contents
- [Apply to be Hero](#apply-to-be-hero)
- [Get Hero profile](#get-hero-profile)
- [Update Hero profile](#update-hero-profile)
- [Accept Hero](#accept-hero)
- [Decline Hero](#decline-hero)
- [Get Hero list](#get-hero-list)
- [Get Hero detail](#get-hero-detail)


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