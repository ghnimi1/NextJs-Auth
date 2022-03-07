import connectDB from '../../../config/connectDB'
import Users from '../../../models/user.model'
import { createActivationToken } from '../../../utils/jwt'
import sendEmail from './sendMail'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await register(req, res)
            break;
    }
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password)
            return res.status(400).json({ msg: "Please fill in all fields." })

        if (!validateEmail(email))
            return res.status(400).json({ msg: "Invalid emails." })

        const user = await Users.findOne({ email })
        if (user) return res.status(400).json({ msg: "This email already exists." })

        if (password.length < 6)
            return res.status(400).json({ msg: "Password must be at least 6 characters." })

        const newUser = {
            name, email, password
        }
        const activation_token = createActivationToken(newUser)
        const url = `http://localhost:3000/user/activate/${activation_token}`
        sendEmail(email, url, "Verify your email address")
        res.json({ msg: "Register Success! Please activate your email to start." })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}