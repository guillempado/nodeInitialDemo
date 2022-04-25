require("dotenv").config();
const sequelize = require("sequelize");
const { execSync } = require('child_process')


switch(process.env.MYSQL_INIT_MODE) {
    case "DROP_CREATE": 
        console.log(`Executing DROP CREATE`);
        console.log(`User: root`);
        execSync('mysql -u root -p < ./mysql_scripts/mysql_dropcreate.sql'); 
        break
    case "CREATE": 
        console.log(`Executing CREATE IF NOT EXISTS`);
        console.log(`User: root`);
        execSync('mysql -u root -p < ./mysql_scripts/mysql_create.sql'); 
        break
}

const db = new sequelize(process.env.MYSQL_DATABASE,  process.env.MYSQL_USER,  process.env.MYSQL_PASSWORD,  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
});

module.exports = db;
