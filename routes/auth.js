const db = require('../db')
const JWT = require('jsonwebtoken')
require('dotenv').config()
module.exports = {
    async post(req,res) {
        try {
            const { token } = req.body
            const auth = await JWT.verify(token,process.env.JWT)
            if (auth) {
                return res.json({
                    pass:true,
                    auth
                })
            }
        }catch(e) {
            res.status(424).json({
                pass:false,
                msg:e.message
            })
        }
    }
}