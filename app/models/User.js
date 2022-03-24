const { Model, DataTypes } = require('sequelize');
const sequelize = require('./utils/mysqlConnection')

class User extends Model {}
User.init({
  name: {
    // Posant type: DataTypes.TEXT dona error pq per garantir 'unique' mysql fa un índex i no el pot fer en un camp de mida variable i amb possibilitat de ser massa gran. Idem per username.
    type: "varchar(30)",
    allowNull: true,
    unique: true
  },
  username: {
    type: "varchar(30)",
    allowNull: true,    // Perquè user es pot autenticar per googleAuth 
    unique: true
  },
  // Desada en salted hash
  password: {
    type: DataTypes.TEXT,
    allowNull: true    // Perquè user es pot autenticar per googleAuth
  },
  // TODO camps per google token si cal més endavant (recorda a fer DROP_CREATE de la BBDD per recrear taules)
}, { 
  sequelize, 
  timestamps: false,
  modelName: 'user' });

module.exports = User