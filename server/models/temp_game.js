const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db.js');

module.exports = sequelize.define("game", {
  dice1: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  dice2: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  won: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
}, {
  timestamps: false,
  });