const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db.js');

module.exports = sequelize.define("room", {
    name: {
        type: DataTypes.STRING,
        primaryKey: true
    },
}, {
    timestamps: false,
    updatedAt: false,
});