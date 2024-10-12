import connectDB from '../../../src/lib/connectDB.js'
import Promotion from '../../../models/Promotion.js'

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      await searchAllPromotions(req, res)
      break
  }
}

const searchAllPromotions = async (req, res) => {
  try {
    await connectDB()
    const details = await Promotion.find({}).sort({ $natural: -1 })

    if (details.length > 0) {
      return res.status(200).json({ message: 'Promotions Found', details })
    } else {
      return res
        .status(404)
        .json({ message: 'Promotions not found', details: undefined })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
