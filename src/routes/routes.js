const { createCognitoUser } = require('../cognitoMethods/createUser')
const { deleteCognitoUser } = require('../cognitoMethods/deleteUser')
const { authCognitoUser } = require('../cognitoMethods/authUser')

module.exports = app => {
  //root
  app.get('/', (req, res, next) => {
    res.send({ message: 'welcome to root route'})
  })
  //create user
  app.post('/user', (req, res, next) => {
    const { body: { email, password } } = req
    createCognitoUser({
      username: email,
      password,
      email,
      phone: ''
    })
      .then(data => res.status(201).send({ data }))
      .catch(e => res.status(400).send({error: e}))
  })
  //delete user
  app.delete('/user', (req, res, next) => {
    const { body: { username } } = req
    deleteCognitoUser(username)
      .then(data => res.status(303).send({ data }))
      .catch(e => res.status(400).send({ error: e }))
  })
  //auth user
  app.post('/auth', (req, res, next) => {
    const { body: { username, password } } = req
    authCognitoUser(username, password)
      .then(token => res.send({ token }))
      .catch(err => res.send({ error: err }))
  })
}