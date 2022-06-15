import client from '../config/db.js'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

export const newPostController = async (req, res) => {
    const {link, message} = req.body
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer", "").trim()
    try {
        const sessionData = await client.query('SELECT * FROM sessions WHERE sessions.token=$1;', [token])
        const userId = sessionData.rows[0].userId

        await client.query(
            `INSERT INTO posts ("userId", link, message) 
             VALUES ($1, $2, $3);`, [userId, link, message])
        
        return res.status(201).send('Post criado')
    } catch(error) { 
        return res.status(500).send(error) 
    }
}