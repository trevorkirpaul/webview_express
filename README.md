# Express Backend

## for WebViews project

This backend contains routes to handle Cognito functions.

> Users' emails are the usernames

### Create User / Sign Up

route: `http://localhost:3002/user`

method: `POST`

params:

```json
{
  "email": "email for new user",
  "password": "password for new user"
}
```

### Delete User

route: `http://localhost:3002/user`

method: `DELETE`

params:

```json
{
  "username": "email/username of user to be deleted" 
}
```

### Auth User

route: `http://localhost:3002/auth`

method: `POST`

params:

```json
{
  "username": "email/username of user requesting auth",
  "password": "password of user requesting auth"
}
```

## CMS Routes

This API now connects to our WordPress based CMS

### Fetch all Quizzes

route: `http://localhost:3002/cms/quiz`

method: `GET`

params: `none`

### Fetch Quiz by ID

route: `http://localhost:3002/cms/quiz/:quizId`

method: `GET`

params: URL param, `quizId`

## Example of returned data from CMS

```json
// http://localhost:3002/cms/quiz/38
{
	"name": "Programming Quiz",
	"id": "5b119558ee3e7",
	"questions": [
		{
			"question": {
				"text": "What is your favorite programming language?",
				"isActive": true,
				"id": "5b119559008f8",
				"answers": [
					{
						"answer": "JavaScript",
						"id": "5b11955905128"
					},
					{
						"answer": "Ruby",
						"id": "5b119559099ca"
					},
					{
						"answer": "Python",
						"id": "5b1195590e655"
					},
					{
						"answer": "C++",
						"id": "5b11955912fda"
					}
				]
			}
		}
	]
}
```

# Initial Setup

## Setup

In order to build and run this project, you will need to create `src/config.js` containing AWS credentials:

```javascript
// src/config.js
module.exports = {
  UserPoolId: //from AWS Cognito dashboard, 'General Settings'
  ClientId: // from AWS Cognito dashboard, 'App Clients'
  accessKeyId: // AWS developer credentials
  secretAccessKey: // AWS developer credentials
}
```