const request = require('graphql-request')
const axios = require('axios')
const config = require('../config')
const { createCognitoUser } = require('../cognitoMethods/createUser')
const { deleteCognitoUser } = require('../cognitoMethods/deleteUser')
const { authCognitoUser } = require('../cognitoMethods/authUser')

const { graphqlApi, wordpressURI } = config

module.exports = app => {
  //root
  app.get('/', (req, res, next) => {
    res.send({ message: 'welcome to root route'})
  })
  //create user
  app.post('/user', (req, res, next) => {
    const { body: { email, password } } = req

    const mutation = `
    mutation {
      signup(
        email: "${email}"
        password: "${password}"
      ) {
        id
        email
        password
      }
    }
    `
    // Cognito
    createCognitoUser({
      username: email,
      password,
      email,
      phone: ''
    })
      .then(data => request.request(graphqlApi, mutation)) // GraphQL request to create user
      .then((data) => res.status(201).send({ message: "GraphQL Success", data }))
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

  // wordpress
  // ? Fetch all quizzes
  app.get('/cms/quiz', (req, res, next) => {
    // http://localhost/wp-json/acf/v3/quiz/
    const request = axios.get(`${wordpressURI}wp-json/acf/v3/quiz`)
    request
      .then(({ data }) => {
        const cleanData = data.map(quiz => quiz.acf)
        const quizes = [...cleanData]
        return res.send(quizes)
      })
      .catch(err => res.send({ err }))
  })
  // ? Fetch quiz by ID
  app.get('/cms/quiz/:quiz', (req, res, next) => {
    const { params } = req
    const request = axios.get(`${wordpressURI}wp-json/acf/v3/quiz/${req.params.quiz}`)
    request
      .then(({ data }) => {
        const quiz = data.acf
        return res.send(quiz)
      })
      .catch(err => res.send({ err }))
  })
}

