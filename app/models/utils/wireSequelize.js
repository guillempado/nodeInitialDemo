const db = require('./mysqlConnection')
const User = require('../User')
const Room = require('../Room')
const Message = require('../Message')

Message.User = Message.belongsTo(User)
Message.Room = Message.belongsTo(Room)

db.sync()
