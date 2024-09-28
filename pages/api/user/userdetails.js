import User from '../../../models/User.js'
import connectDB from '../../../src/lib/connectDB.js'

export default async function handler (req, res) {
  switch (req.method) {
    case 'PUT':
      await updateUserDetails(req, res)
      break
  }
}

const updateUserDetails = async (req, res) => {
  try {
    await connectDB()
    const { userId } = req.query

    if (!userId) {
      return res.status(400).json({ message: 'Invalid Credentials' })
    }

    const details = await User.findOneAndUpdate(
      { _id: userId },
      req.body.profile,
      {
        new: true
      }
    )

    if (details) {
      return res.status(200).json({ message: 'Details Updated', details })
    } else {
      return res.status(400).json({ message: 'Please try again!' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
