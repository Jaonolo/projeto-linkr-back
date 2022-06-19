import client from '../config/db.js'
import postsRepository from "../repositories/postsRepository.js";

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

export async function getPostsByHashtag(req, res) {
    const {hashtag} = req.query;

    try {
        
    } catch (error) {
        res.status(500).send(error);
    }
}