const httpStatus = require('http-status')

const { env } = require('../config')

const authApiKey = () => (req, res, next) => {
  const apiKey = req.headers['x-api-key']

  if (!apiKey) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      code: httpStatus.UNAUTHORIZED,
      message: 'Unauthorized'
    })
  }

  const listApiKey = env.apiKey.trim().split(',')

  if (!listApiKey.includes(apiKey)) {
    res.status(httpStatus.FORBIDDEN).send({
      code: httpStatus.FORBIDDEN,
      message: 'Forbidden'
    })
  }

  next()
}

module.exports = authApiKey
