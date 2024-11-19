const router = require('express').Router()

const { ReadingLists, Blog, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.get('/', async (req, res) => {
  const readinglists = await ReadingLists.findAll({})
  res.json(readinglists)
})

router.post('/', async (req, res) => {
  const blog = await Blog.findByPk(req.body.blogId)
  const user = await User.findByPk(req.body.userId)

  if (!blog || !user) {
    return res.status(400).json({ error: 'Wrong  id' });
  }
  const readingList = await ReadingLists.create(req.body)
  res.json(readingList)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const readingList = await ReadingLists.findByPk(req.params.id)
  if (req.decodedToken.id == readingList.dataValues.userId) {
    readingList.readState = req.body.readState
    await readingList.save()
    return res.json(readingList)
  }
  return res.status(401).json({ error: 'Permission denied' })
})

module.exports = router