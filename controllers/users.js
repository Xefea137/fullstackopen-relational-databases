const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }})
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (err) {
    res.status(400).json({ errors: err.errors[0].message });
  }  
})

router.put('/:username', async (req, res) => {
  const username = req.params.username
  const user = await User.findOne({ where: { username } })

  if (user) {
    const newUsername = req.body.newUsername
    user.username = newUsername
    await user.save()
    res.json(user)
  } else {
    res.status(400).end()
  }
})

module.exports = router