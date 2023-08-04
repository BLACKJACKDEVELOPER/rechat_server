const monk = require('monk')
require('dotenv').config()

const conn = monk(process.env.MONGO) // get url by dot env



module.exports = {
  users:conn.get('users'), // initial collection users
  msgs:conn.get('msgs'), // initial collection msgs
  rooms:conn.get('rooms') // inital collection rooms
}