import User from '../../../models/User.js'
import connectDB from '../../../src/lib/connectDB.js'

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      await searchUsers(req, res)
      break
    case 'PUT':
      await updateUserDetails(req, res)
      break
    case 'DELETE':
      await deleteUserDetails(req, res)
      break
  }
}

const searchUsers = async (req, res) => {
  try {
    await connectDB()
    const details = await User.find({}).sort({ $natural: -1 })

    if (details.length > 0) {
      return res.status(200).json({ message: 'Users Found', details })
    } else {
      return res
        .status(404)
        .json({ message: 'No Users found', details: undefined })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
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

const deleteUserDetails = async (req, res) => {
  try {
    await connectDB()

    const { userId } = req.query

    const userdetails = await User.findOneAndDelete({
      _id: userId
    })

    if (userdetails) {
      return res.status(200).json({ message: 'User Deleted' })
    } else {
      return res.status(200).json({ message: 'User not available' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
