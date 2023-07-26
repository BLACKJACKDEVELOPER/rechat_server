const db = require('../db.js')
const JWT = require('jsonwebtoken')
require('dotenv').config()
module.exports = {
    async post(req, res) {
        try {
            const { email, password , remember } = req.body
            const findOne = await db('SELECT * FROM users WHERE email=? AND password=?;',
                [email, password])
            if (findOne == false) {
                throw Error('ไม่พบผู้ใช้งาน โปรดตรวจสอบอีเมล์หรือรหัสผ่านให้ครบถ้วน 🎃')
            }
            delete findOne[0].password
            if (remember) { // No expires
                const token = JWT.sign(findOne[0],process.env.JWT)
                return res.status(200).json({
                    pass:true,
                    msg:'เข้าสู่ระบบสำเร็จ',
                    token
                })
            }else{
                const token = JWT.sign(findOne[0],process.env.JWT,{expiresIn:'1m'})
                return res.status(200).json({
                    pass:true,
                    msg:'เข้าสู่ระบบสำเร็จ',
                    token
                })
            }
        } catch (e) {
            console.log(e)
            res.status(200).json({
                pass:false,
                msg: e.message
            })
        }
    }
}