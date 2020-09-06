# NodeJS API example with auth and files uploading

## Features

- Bearer token authorization
- Token valid 10 minutes, request
- CORS for access from any domain
- Database - MySQL
- Unit testing

## API reference

### Authorization

/signup [POST] - User registration with id and password.
id - phone number or email
returns bearer token after successfull registration
/signin [POST] - returns bearer token and refresh token with correct credentials
/signin/new_token [POST] - update bearer token on refresh token sent
/info [GET] - returns user id in payload
/logout [GET] - logout, old token removed from DB and local storage

### File storage

/file/upload [POST] - upload file to storage and add new file to the database
file has: name, extension, MIME type, size, upload date
/file/list [GET] - Files list with pagination

- page size is a parameter list_size
- default is 10 items on a page
- page number in the page parameter, default is 1 if empty
  /file/delete/:id [DELETE] - delete file from storage and DB
  /file/:id [GET] - show file info
  /file/download/:id [GET] - download link
  /file/update/:id [PUT] - replace file in storage, update file info in database

## Unit tests

```bash
npm run test
```
