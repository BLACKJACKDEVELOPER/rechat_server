const { rooms } = require('../db.js')

module.exports = {
	async get(req,res) {
		try {
			const { query:{ id , myroom } } = req
			let allroom = id == undefined ? await rooms.find({}) : await rooms.find({_id:id});
			if (myroom == 'true') {
				allroom = await rooms.find({owner:req.user._id})
			}
			return res.json({
				data:allroom,
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