const { users } = require('../db')

module.exports = {
    async post(req,res) {
        try {
            const { username , fullname , email , birth , password } = req.body   
            const qr = await users.insert({username,fullname,email,birth,password,profile:'default.jpg'})
            console.log(qr)
            return res.status(201).json(qr !== {})

        }catch(e) {
            res.status(424).json({
                msg:e.message
            })
        }
    }
}