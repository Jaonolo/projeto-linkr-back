import client from '../config/db.js'

export const getUser = async (req, res) => {
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer", "").trim()

    try {
        const result = await client.query(
            `SELECT users.id, users."userName", users."profilePicture"
             FROM users
             JOIN sessions ON sessions.token = $1
             WHERE users.id = sessions."userId";`, [token])
        const user = result.rows[0]
        return res.status(200).send(user)
    } catch(error) { 
        return res.status(500).send(error) 
    }
}

export const getUsersByName = async (req, res) => {
    try {
        const {searchString} = req.body
        const result = await client.query(
            `SELECT users.id, users."userName", users."profilePicture"
             FROM users
             WHERE users."userName" LIKE $1;`, [searchString + '%'])
        return res.status(200).send(result)
    } catch(error) { 
        return res.status(500).send(error) 
    }
}