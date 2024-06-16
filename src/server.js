const express = require('express')

const { env } = require('./config')
const baseRoute = require('./routes/base.route')

const app = express()

app.use(express.json())

app.use('/', baseRoute)

app.listen(env.port, () => {
  console.log(`Service running on port ${env.port}`)
})
