module.exports = app => {
  //root
  app.get('/', (req, res, next) => {
    res.send({ message: 'welcome to root route'})
  })
}