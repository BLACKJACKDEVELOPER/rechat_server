const db = require('../db')

module.exports = {
    async post(req,res) {
        try {
            const { username , fullname , email , birth , password } = req.body   
            const qr = await db('INSERT INTO users(username,fullname,email,birth,password) VALUES (?,?,?,?,?);',
            [username,fullname,email,birth,password])
            return res.status(201).json(qr !== {})

        }catch(e) {
            res.status(424).json({
                msg:e.message
            })
        }
    }
}