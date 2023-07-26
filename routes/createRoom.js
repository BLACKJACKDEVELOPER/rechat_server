const db = require('../db.js')
const fs = require('fs')
const path = require('path')
module.exports = {
    async post(req,res) {
        try {
            const { roomName,roomPassword,roomDescript,image } = req.body
            // save image
            const nameImage = Math.floor(Math.random() * 100000)
            fs.writeFileSync(path.join(__dirname,'../public/images/'+nameImage+'.jpg'),image,{ encoding:'base64' })
            const insertOne = await db('INSERT INTO rooms(roomName,roomPassword,roomDescript,image,owner) VALUES (?,?,?,?,?);',
            [roomName,roomPassword,roomDescript,nameImage+'.jpg',req.user.id])
            res.json({
                pass:true,
                msg:'Create a room successfully'
            })

        }catch(e) {
            console.log(e)
            res.json({
                pass:false,
                msg:e.message
            })
        }
    }
}