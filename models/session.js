const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Session extends Model {}

Session.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false,
  underscored: true,
  modelName: 'session',
  tableName: 'session'
})

module.exports = Session