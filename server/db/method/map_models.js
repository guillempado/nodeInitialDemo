
const db = require('../db')

module.exports = new Promise(async (resolve, reject) => {
    try {
        // Build sequelize
        await require("./connect");

        // Incorporar tots els models manualment
        db.User = require('../../models/user');
        db.Room = require('../../models/room');
        db.Message = require('../../models/message');

        // Map FKs
        db.User.hasMany(db.Message);
        db.Message.belongsTo(db.User /*, {foreignKey: 'userId'}*/);
        db.Room.hasMany(db.Message);
        db.Message.belongsTo(db.Room /*, {foreignKey: 'roomId'}*/);

        // Sync dels models
        await db.sequelize.sync();

        // Es pot fer una prova per comprovar q esta ben connectat
        db.sequelize.authenticate()
            .then(() => {
                console.log('The connection to the database has been established successfully');
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