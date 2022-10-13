const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db.js');

module.exports = sequelize.define("player", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  winsPercent: {
    type: DataTypes.DECIMAL(5,2), // Cal que sigui decimal per poder filtrar a SQL perquè, si li posem FLOAT, clàusula WHERE retorna null quan es compara per igualtat encara que el valor existeixi (per la imprecisió dels floats)
    defaultValue: null,  // Faig servir null com a 'no inicialitzat'
    allowNull: true
  }
  // Sequelize afegeix per defecte 'createdAt', no cal incloure'l a la descripció
}, {
  // Trec updatedAt, que també ve per defecte i no interessa
  updatedAt: false,
  });