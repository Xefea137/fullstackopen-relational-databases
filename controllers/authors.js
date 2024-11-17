const router = require('express').Router()
const { sequelize } = require('../util/db')
const { Blog } = require('../models')

router.get('/', async(req, res) => {
  const users = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('title')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    group: 'author',
    order: [['likes', 'DESC']]
  })
  res.json(users)
})

module.exports = router