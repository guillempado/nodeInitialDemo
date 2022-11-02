const mysql = require("mysql2");
const Sequelize = require("sequelize");
const config = require("../config");
const db = require("../db");

const {
    host,
    port,
    user,
    password,
    database
} = config.database;

module.exports = new Promise(async (resolve, reject) => {

    try {
        // create db_utils if it doesn't already exist
        const connection = await mysql.createConnection({
            host,
            port,
            user,
            password
        });

        await connection.promise().query(
            `CREATE DATABASE IF NOT EXISTS ${database};`
        );

        connection.end();

        // construeix sequelize object
        db.sequelize = new Sequelize(database, user, password, {
                dialect: 'mysql',
                host,
                port,
                pool: {
                    max: config.pool.max,
                    min: config.pool.min,
                    acquire: config.pool.acquire,
                    idle: config.pool.idle
                },
                logging: config.logging
            }
        )

        resolve();

    } catch (error) {
        reject(error);
    }
})
