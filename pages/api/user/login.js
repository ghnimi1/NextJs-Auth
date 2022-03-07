import connectDB from '../../../config/connectDB'
import Users from '../../../models/user.model'
import bcrypt from 'bcrypt'
import { createAccessToken, createRefreshToken } from '../../../utils/jwt'


connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await login(req, res)
            break;
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Users.findOne({ email })
        if (!user) return res.status(400).json({ msg: 'This email does not exist.' })
        const isMatch = await user.comparePassword(password)
        if (!isMatch) return res.status(400).json({ msg: "Incorrect password." })

        const access_token = createAccessToken({ id: user._id })
        const refresh_token = createRefreshToken({ id: user._id })
        res.json({ refresh_token, access_token, user, msg: "Login success!" })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

}