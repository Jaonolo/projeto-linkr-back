import client from '../config/db.js'

export const newPostController = async (req, res) => {
    const {userId, link, message} = res.locals.postData
    try {
        await client.query(
            `INSERT INTO posts ("userId", link, message) 
             VALUES ($1, $2, $3);`, [userId, link, message])
        return res.status(201).json({message:'Post criado.'})
    } catch(error) { 
        return  res.status(500).send(error) 
    }
}