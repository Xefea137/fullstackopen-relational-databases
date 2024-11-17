const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isBetween(value) {
        if (value < 1991 || value > new Date().getFullYear()) {
          throw new Error(`Year must be between 1991 and ${new Date().getFullYear()}`)
        }
      }
      // min: 1991,
      // max: new Date().getFullYear()
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.fn('NOW')
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.fn('NOW')
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

module.exports = Blog