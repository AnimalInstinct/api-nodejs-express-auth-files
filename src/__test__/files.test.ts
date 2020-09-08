import request from 'supertest'
import app from '../app'
import sequelize from '../models/sequelize'
const fs = require('fs')

let cookie: any

beforeEach(async () => {
  await sequelize.sync({ force: true })
  await request(app)
    .post('/api/auth/signup')
    .send({
      userName: 'User1',
      email: 'test@test.com',
      password: '12345',
      firstName: 'User',
      lastName: 'One',
    })
    .expect(201)
  const response = await request(app)
    .post('/api/auth/signin')
    .send({
      email: 'test@test.com',
      password: '12345',
    })
    .expect(200)
  cookie = response.get('Set-Cookie')
})

it('returns a 401 on attempt to upload without signing in', async () => {
  const filePath = `${__dirname}/img/carpet.jpg`
  await request(app)
    .post('/api/files/upload')
    .attach('file', filePath)
    .expect(401)
})

it('returns a 400 if request has no file', async () => {
  await request(app).post('/api/files/upload').expect(401)
})

it('returns a 200 on successfull upload', async () => {
  const filePath = `${__dirname}/img/carpet.jpg`
  const originalName = 'carpet.jpg'
  const response2 = await request(app)
    .post('/api/files/upload')
    .set('Cookie', cookie)
    .attach('myFile', filePath)
    .expect(201)
  expect(response2.body.originalName).toEqual(originalName)
  request(app)
    .delete(`/api/files/delete/${response2.body.id}`)
    .set('Cookie', cookie)
    .expect(204)
})

it('returns list of 3 uploaded files', async () => {
  const filePath = `${__dirname}/img/carpet.jpg`
  let filesToUpload = 3
  let filesUploaded: { id: string }[] = []
  let i = 0
  for (i = 0; i < filesToUpload; i++) {
    const uploaded = await request(app)
      .post('/api/files/upload')
      .set('Cookie', cookie)
      .attach('myFile', filePath)
      .expect(201)
    filesUploaded[i] = uploaded.body
  }
  const response2 = await request(app)
    .get('/api/files/list')
    .set('Cookie', cookie)
    .expect(200)
  expect(response2.body.length).toEqual(3)
  filesUploaded.map(file => {
    request(app)
      .delete(`/api/files/delete/${file.id}`)
      .set('Cookie', cookie)
      .expect(204)
  })
})

it('returns list of 5 uploaded files, 3 on 1st page and 2 on 2nd', async () => {
  const filePath = `${__dirname}/img/carpet.jpg`
  let filesToUpload = 5
  let filesUploaded: { id: string }[] = []
  let i = 0
  for (i = 0; i < filesToUpload; i++) {
    const uploaded = await request(app)
      .post('/api/files/upload')
      .set('Cookie', cookie)
      .attach('myFile', filePath)
      .expect(201)
    filesUploaded[i] = uploaded.body
  }
  const response2 = await request(app)
    .get('/api/files/list?listSize=3&page=1')
    .set('Cookie', cookie)
    .expect(200)
  expect(response2.body.length).toEqual(3)
  const response3 = await request(app)
    .get('/api/files/list?listSize=3&page=2')
    .set('Cookie', cookie)
    .expect(200)
  expect(response3.body.length).toEqual(2)
  filesUploaded.map(file => {
    request(app)
      .delete(`/api/files/delete/${file.id}`)
      .set('Cookie', cookie)
      .expect(204)
  })
})

it('upload file, check physically uploaded, delete file from database and from disk', async () => {
  const filePath = `${__dirname}/img/carpet.jpg`
  const response2 = await request(app)
    .post('/api/files/upload')
    .set('Cookie', cookie)
    .attach('myFile', filePath)
    .expect(201)
  const file = response2.body
  const list = await request(app)
    .get('/api/files/list?listSize=3&page=1')
    .set('Cookie', cookie)
    .expect(200)
  expect(fs.existsSync(file.path)).toEqual(true)
  await request(app)
    .delete(`/api/files/delete/${file.id}`)
    .set('Cookie', cookie)
    .expect(204)
  expect(fs.existsSync(file.path)).toEqual(false)
})

it('get file information', async () => {
  const filePath = `${__dirname}/img/carpet.jpg`
  const file = await request(app)
    .post('/api/files/upload')
    .set('Cookie', cookie)
    .attach('myFile', filePath)
    .expect(201)
  await request(app).get(`/api/files/${file.body.id}`).expect(401)
  const response = await request(app)
    .get(`/api/files/${file.body.id}`)
    .set('Cookie', cookie)
    .expect(200)
  expect(response.body).toEqual({
    id: file.body.id,
    originalName: file.body.originalName,
    extension: file.body.extension,
    mimeType: file.body.mimeType,
    size: file.body.size,
  })
  await request(app)
    .delete(`/api/files/delete/${file.body.id}`)
    .set('Cookie', cookie)
    .expect(204)
})

it('download file link', async () => {
  const filePath = `${__dirname}/img/carpet.jpg`
  const file = await request(app)
    .post('/api/files/upload')
    .set('Cookie', cookie)
    .attach('myFile', filePath)
    .expect(201)
  await request(app)
    .get(`/api/files/download/${file.body.id}`)
    .set('Cookie', cookie)
    .expect(200)
})

it('update file', async () => {
  const filePath = `${__dirname}/img/carpet.jpg`
  const filePath2 = `${__dirname}/img/cat.jpg`
  const file = await request(app)
    .post('/api/files/upload')
    .set('Cookie', cookie)
    .attach('myFile', filePath)
    .expect(201)
  const beforeChanged = await request(app)
    .get(`/api/files/${file.body.id}`)
    .set('Cookie', cookie)
    .expect(200)
  expect(beforeChanged.body).toEqual({
    id: file.body.id,
    originalName: file.body.originalName,
    extension: file.body.extension,
    mimeType: file.body.mimeType,
    size: file.body.size,
  })
  const file2 = await request(app)
    .put(`/api/files/update/${file.body.id}`)
    .set('Cookie', cookie)
    .attach('myFile', filePath2)
    .expect(200)
  const afterChanged = await request(app)
    .get(`/api/files/${file.body.id}`)
    .set('Cookie', cookie)
    .expect(200)
  expect(afterChanged.body).toEqual({
    id: file2.body.id,
    originalName: file2.body.originalName,
    extension: file2.body.extension,
    mimeType: file2.body.mimeType,
    size: file2.body.size,
  })
  await request(app)
    .delete(`/api/files/delete/${file.body.id}`)
    .set('Cookie', cookie)
    .expect(204)
})
