const express = require('express')
const httpStatus = require('http-status')

const authApiKey = require('../middlewares')
const { mailService } = require('../services')
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

baseRoute.post('/send-mail', authApiKey, async (req, res) => {
  const { emailData, type } = req.body
  await mailService.sendEmailWithTemplate(emailData, type)
  res.send({
    code: httpStatus.OK,
    message: 'Send mail success'
  })
})

module.exports = baseRoute
