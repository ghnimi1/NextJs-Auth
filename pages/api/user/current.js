import connectDB from '../../../config/connectDB'
import Users from '../../../models/user.model'
import auth from '../../../middleware/auth'


connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await current(req, res)
            break;
    }
}

const current = async (req, res) => {
    try {
        const result = await auth(req, res)
        const user = await Users.findById(result.id).select('-password')
        res.json(user)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}