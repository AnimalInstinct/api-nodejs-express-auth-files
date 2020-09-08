# NodeJS Express Typescript Sequelize API example with JWT authorization and file upload CRUD

## Installation and run

```bash
git pull git@github.com:AnimalInstinct/api-nodejs-express-auth-files.git
cd api-nodejs-express-auth-files
npm install
```

## Features

- Bearer token JWT authorization with refreshToken feature without dependencies
- File uloading CRUD
- CORS friendly accessable from any domain
- Database - MySQL via Sequelize ORM
- Unit tests, Jest

## API reference

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/919f8c9e6170273e0bd6)

### Authorization without dependencies

/api/auth/signup [POST] - User registration with id and password

- id - phone number or email
- returns bearer and refresh tokens after successfull registration
- bearer and refresh tokens encoded in base64 and pushed to the client's cookies

/api/auth/signin [POST] - returns bearer token with correct credentials provided

- bearer token lifetime is 10 minutes

/api/auth/signin/new_token [POST] - update bearer token on refresh token sent

/api/auth/info [GET] - returns user id in payload

/api/auth/logout [GET] - logout, old token removed from DB and local storage

### File storage

/api/file/upload [POST] - upload file to storage and add new file to the database

- file has: name, extension, MIME type, size, upload date

/api/file/list [GET] - Files list with pagination

- page size is a parameter list_size
- default is 10 items on a page
- page number in the page parameter, default is 1 if empty

/api/file/delete/:id [DELETE] - delete file from storage and DB

/api/file/:id [GET] - show file info

/api/file/download/:id [GET] - download link

/api/file/update/:id [PUT] - replace file in storage, update file info in database

## Unit tests

### Users auth tests list:

- returns a 201 on successfull signup
- got bearer and refresh token on signup
- got bearer and refresh token on signin
- returns bearer token on refresh token provided
- show logged in user information (id)
- got 404 on non existing user on SignIn
- got 400 on incorrect login (not email) on SignIn
- got 400 on incorrect password on SignIn
- got 400 on no login on SignIn
- got 400 on no password on SignIn
- returns a 400 with an invalid email on signUp
- returns a 400 with an invalid password on signUp
- returns a 400 with missing email and password on signUp

### File storage tests list:

- returns a 401 on attempt to upload without signing in
- returns a 400 if request has no file
- returns a 200 on successfull upload
- returns list of 3 uploaded files
- returns list of 5 uploaded files, 3 on 1st page and 2 on 2nd
- upload file, check physically uploaded, delete file from database and from disk
- get file information
- download file link
- update file

To run tests type a command:

```bash
npm run test
```
