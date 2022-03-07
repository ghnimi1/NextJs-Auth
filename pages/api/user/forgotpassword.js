import connectDB from '../../../config/connectDB'
import Users from '../../../models/user.model'
import { createAccessToken } from '../../../utils/jwt'
import sendEmail from './sendMail'
const CLIENT_URL = "http://localhost:3000"
connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await forgotpassword(req, res)
            break;
    }
}

const forgotpassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await Users.findOne({ email })
        if (!user) return res.status(400).json({ msg: "This email does not exist." })

        const access_token = createAccessToken({ id: user._id })
        const url = `${CLIENT_URL}/user/resetpassword/${access_token}`

        sendEmail(email, url, "Reset your password")
        res.json({ msg: "Re-send the password, please check your email." })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}