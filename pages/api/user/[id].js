import connectDB from '../../../config/connectDB'
import Users from '../../../models/user.model'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getuser(req, res)
            break;
        case "DELETE":
            await deleteUser(req, res)
            break;
        case "PATCH":
            await updateRole(req, res)
            break;

    }
}

const deleteUser = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result.admin !== true)
            return res.status(400).json({ err: "Authentication is not valid" })

        const { id } = req.query

        await Users.findByIdAndDelete(id)
        res.json({ msg: 'Deleted Success!' })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

const updateRole = async (req, res) => {
    try {
        const { admin } = req.body
        const result = await auth(req, res)
        if (result.admin !== true)
            return res.status(400).json({ err: "Authentication is not valid" })

        const { id } = req.query
        await Users.findByIdAndUpdate({ _id: id }, { admin })
        res.json({ msg: 'updated role Success!' })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

const getuser = async (req, res) => {
    try {
        const { id } = req.query
        await auth(req, res)
        const user = await Users.findById(id).select('-password')
        res.json(user)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}