const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
const app = express()
const port = 3002

app.use(cors())
app.use(bodyParser.json())

routes(app)

app.listen(port, () => console.log(`EXPRESS server running on ${port}`))
