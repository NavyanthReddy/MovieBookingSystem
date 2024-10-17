import Card from '../../../models/PaymentCard'
import connectDB from '../../../src/lib/connectDB'

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      await searchPaymentCard(req, res)
      break
  }
}

const searchPaymentCard = async (req, res) => {
  try {
    await connectDB()

    const userId = req.query.userId

    const paymentCards = await Card.find({ user: userId }).select(
      '-cvv -expiry -createdAt -updatedAt -__v'
    )

    res.status(200).json({ paymentCards })
  } catch (error) {
    console.error('Error fetching payment cards:', error)
    res.status(500).json({ message: 'Internal server error.' })
  }
}
