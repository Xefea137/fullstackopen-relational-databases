const jwt = require('jsonwebtoken')
const { SECRET } = require('./config.js')
const { User } = require('../models')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      const user = await User.findByPk(req.decodedToken.id)
      if (user.disabled) {
        return res.status(401).json({ error: 'User is disabled' })
      }
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = { tokenExtractor }