const express = require('express')
const httpStatus = require('http-status')

const baseRoute = express.Router()

baseRoute.get('/', (req, res) => {
  res.send({
    code: httpStatus.OK,
    message: 'Service mailer is running'
  })
})

baseRoute.all('*', (req, res) => {
  res.status(httpStatus.NOT_FOUND).send({
    code: httpStatus.NOT_FOUND,
    message: 'Not found'
  })
})

module.exports = baseRoute
