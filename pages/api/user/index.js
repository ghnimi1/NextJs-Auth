import connectDB from '../../../config/connectDB'
import Users from '../../../models/user.model'


connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getusers(req, res)
            break;
        case "PATCH":
            await updateUser(req, res)
            break;
    }
}

const getusers = async (req, res) => {
    try {
        const users = await Users.find({}).select('-password')
        res.json(users)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

}

const updateUser = async (req, res) => {
    try {
        const { name, avatar } = req.body
        await Users.findOneAndUpdate({ _id: req.user.id }, { name, avatar })
        res.json({ msg: "updated success" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}