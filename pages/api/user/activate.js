import connectDB from '../../../config/connectDB'
import Users from '../../../models/user.model'
const jwt = require('jsonwebtoken')

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await activate(req, res)
            break;
    }
}

const activate = async (req, res) => {
    try {
        const { activation_token } = req.body
        const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)
        const { name, email, password } = user
        const check = await Users.findOne({ email })
        if (check) return res.status(400).json({ msg: "This email already exists." })
        const newUser = new Users({
            name, email, password
        })
        await newUser.save()
        res.json({ msg: "Account has been activated!" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}