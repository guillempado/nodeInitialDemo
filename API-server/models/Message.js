const { Model, DataTypes } = require('sequelize');
const sequelize = require('./utils/mysqlConnection')

class Message extends Model {}
Message.init({
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  sequelize, 
  timestamps: false,
  modelName: 'message' });

module.exports = Message