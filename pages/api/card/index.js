import Card from '../../../models/PaymentCard.js'
import connectDB from '../../../src/lib/connectDB.js'

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      await searchAllCardDetails(req, res)
      break
  }
}

const searchAllCardDetails = async (req, res) => {
  try {
    await connectDB()
    const details = await Card.find({}).sort({ $natural: -1 })

    if (details.length > 0) {
      return res.status(200).json({ message: 'Card Details Found', details })
    } else {
      return res
        .status(404)
        .json({ message: 'Card Details not found', details: undefined })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
