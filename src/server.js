const express = require('express')
const baseRoute = require('./routes/base.route')

const app = express()

app.use(express.json())

app.use('/', baseRoute)

app.listen(3000, () => {
  console.log('Service running on port 3000')
})
