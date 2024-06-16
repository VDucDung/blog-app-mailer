const express = require('express')

const { env } = require('./config')
const { baseRoute } = require('./routes')
const { QUEUE_TYPES } = require('./constans')
const { mailService, rabbitmqService } = require('./services')

const app = express()

app.use(express.json())

app.use('/', baseRoute)

rabbitmqService.resovleQueue(QUEUE_TYPES.EMAIL_QUEUE, async (data) => {
  const { emailData, type } = data
  await mailService.sendEmailWithTemplate(emailData, type)
})

app.listen(env.port, () => {
  console.log(`Service running on port ${env.port}`)
})
