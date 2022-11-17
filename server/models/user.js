const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db.js');

module.exports = sequelize.define("user", {
    name: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    timestamps: false,
    updatedAt: false,
});