const nodemailer = require('nodemailer')

const { env } = require('../config')

const transport = nodemailer.createTransport(env.email.smtp)
transport
  .verify()
  .then(() => console.log('Connected to email server'))
  .catch(() => console.log('Connect to email server failed'))

const sendEmail = async (options) => {
  const message = {
    from: `Blog App <${env.email.from}>`,
    to: options.emails,
    subject: options.subject,
    html: options.html,
    cc: options.cc,
    bcc: options.bcc
  }
  await transport.sendMail(message)
}

module.exports = {
  sendEmail
}
