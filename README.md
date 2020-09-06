# NodeJS Express Typescript Sequelize API example with JWT auth and files uploading features implemented

## Installation and run

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

```bash
npm run test
```
