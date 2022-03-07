import connectDB from '../../../config/connectDB'
import Users from '../../../models/user.model'
import auth from '../../../middleware/auth'


connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "PATCH":
            await updateprofile(req, res)
            break;
    }
}

const updateprofile = async (req, res) => {
    try {
        const result = await auth(req, res)
        const { name, avatar } = req.body
        await Users.findOneAndUpdate({ _id: result.id }, { name, avatar })
        res.json({ msg: "updated success" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}