const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('session' , {
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
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('session')
  },
}