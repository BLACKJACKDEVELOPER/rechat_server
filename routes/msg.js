const { msgs } = require('../db.js')

module.exports = {
	async get(req,res) {
		try {
			const { query:{ room } } = req
			const data = await msgs.aggregate([
      {
        $lookup: {
          from: 'users',
          let: { user_id: { $toObjectId: '$user_id' } }, // Convert user_id to ObjectId
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$user_id'] }
              }
            }
          ],
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $match: {
          room
        }
      }
    ]);
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