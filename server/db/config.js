require("dotenv").config();

module.exports ={
    "database":{
        "host": process.env.MYSQL_HOST,
        "port": Number(process.env.MYSQL_PORT),
        "user": process.env.MYSQL_USER,
        "password": process.env.MYSQL_PASSWORD,
        "database": process.env.MYSQL_DATABASE
    },
    "pool": {
        "max": 5,
        "min": 0,
        "acquire": 30000,
        "idle": 10000
    }
};