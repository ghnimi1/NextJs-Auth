import connectDB from '../../../config/connectDB'
import Users from '../../../models/user.model'
import auth from '../../../middleware/auth'
import bcrypt from 'bcrypt'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "PATCH":
            await resetpassword(req, res)
            break;
    }
}

const resetpassword = async (req, res) => {
    try {
        const result = await auth(req, res)
        const { password } = req.body
        const passwordHash = await bcrypt.hash(password, 12)
        if (password.length < 6)
            return res.status(400).json({ msg: "Password must be at least 6 characters." })
        await Users.findOneAndUpdate({ _id: result.id }, { password: passwordHash })

        res.json({ msg: "Update Success!" })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}