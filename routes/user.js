const db = require('../db.js')
const JWT = require('jsonwebtoken')
require('dotenv').config()
const fs = require('fs')

module.exports = {
	async post(req,res) {
		try {
			const { body:{ profile , username , fullname , email , birth } } = req
			await db("UPDATE users SET username=? , fullname=? ,  email=? , birth=? WHERE id=?;",
				[username,fullname,email,birth,req.user.id]);
			if (profile) {
				const name = `${Math.floor(Math.random() * 100000)}.jpg`
				hasProfile = true
				fs.writeFileSync(`${__dirname}/../public/images/${name}`,profile,{encoding:'base64'})
				await db('UPDATE users SET profile=? WHERE id=?;',[name,req.user.id])
			}

			// token genarater
			const newer = await db('SELECT * FROM users WHERE id=?;',[req.user.id])
			const token = await JWT.sign(newer[0],process.env.JWT)

			res.json({
				pass:true,
				msg:'อัปเดทข้อมูลแล้ว',
				token:token
			})
		}catch(e) {
			console.log(e)
			return res.json({
				pass:false,
				msg:e.message
			})
		}
	}
}