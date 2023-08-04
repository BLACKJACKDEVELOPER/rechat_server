const { rooms } = require('../db.js')
const fs = require('fs')
const path = require('path')
module.exports = {
    async post(req,res) {
        try {
            const { roomName,roomPassword,roomDescript,image } = req.body
            // save image
            const nameImage = Math.floor(Math.random() * 100000)
            fs.writeFileSync(path.join(__dirname,'../public/images/'+nameImage+'.jpg'),image,{ encoding:'base64' })
            // insert into rooms
            await rooms.insert({ roomName , roomPassword , roomDescript , image:nameImage+'.jpg',owner:req.user._id })
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