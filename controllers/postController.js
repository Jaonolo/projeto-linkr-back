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

export const editPostController = async (req, res) => {
    const { id, message, userId} = res.locals.editPostData
    try {
        await client.query(
            `UPDATE posts
             SET message = $1, edited = $2
             WHERE id = $3 AND "userId" = $4;`, [message, true, id, userId])
        return res.status(200).json({message:'Post editado.'})
    } catch(error) { 
        console.log(error)
        return  res.status(500).send(error.data)
    }
}