import connectDB from '../../../config/connectDB'
import { createAccessToken, createRefreshToken } from '../../../utils/jwt'
import jwt from 'jsonwebtoken'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await refreshtoken(req, res)
            break;
    }
}

const refreshtoken = async (req, res) => {
    try {
        const refr_token = req.cookies.refreshTokenn
        if (!refr_token) return res.status(400).json({ msg: 'Please login now!' })
        jwt.verify(refr_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: "Please login now" })
            const access_token = createAccessToken({ id: user.id })
            res.json({ access_token })
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

}