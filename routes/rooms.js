const db = require('../db.js')

module.exports = {
	async get(req,res) {
		try {
			const { query:{ id } } = req
			const qr = id ? 'SELECT * FROM rooms WHERE id=?;' : 'SELECT * FROM rooms;'
			const rooms = await db(qr,[id ? id : '']);
			return res.json({
				data:id ? rooms[0] : rooms,
				pass:true
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