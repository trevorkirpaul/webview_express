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