const { Model, DataTypes } = require('sequelize');
const sequelize = require('./utils/mysqlConnection')

class Room extends Model {}
Room.init({
  name: {
    // Posant type: DataTypes.TEXT dona error pq per garantir 'unique' mysql fa un índex i no el pot fer en un camp de mida variable i amb possibilitat de ser massa gran
    type: "varchar(30)",  
    allowNull: false,
    unique: true
  },
}, { 
  sequelize, 
  timestamps: false,
  modelName: 'room' });

module.exports = Room