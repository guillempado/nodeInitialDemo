
const db = require('../db')

module.exports = new Promise(async (resolve, reject) => {
    try {
        // Build sequelize
        await require("./connect");

        // Incorporar tots els models manualment
        db.Player = require('../../models/player');
        db.Game = require('../../models/game');

        // Map FK
        db.Player.Game = db.Player.hasMany(db.Game)
        db.Game.Player = db.Game.belongsTo(db.Player)

        // Sync dels models
        await db.sequelize.sync();

        // Es pot fer una prova per comprovar q esta ben connectat
        db.sequelize.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the db:', err);
            });

        // Retorn
        resolve();

    } catch (error) {
        reject(error);
    }
})