const db = require('../db.js')

module.exports = {
	async get(req,res) {
		try {
			const { query:{ room } } = req
			const data = await db('SELECT * FROM report_msgs WHERE room=?;',
				[room]);
			return res.json({
				data,
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