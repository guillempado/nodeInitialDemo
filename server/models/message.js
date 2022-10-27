const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db.js');

module.exports = sequelize.define("message", {
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ts: {
        type: DataTypes.DATE,
        allowNull: false
    }

}, {
    timestamps: false,
    updatedAt: false,
});