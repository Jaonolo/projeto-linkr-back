import Joi from "joi"

import client from '../config/db.js'

export async function newRepostValidation(req, res, next){
    const { postId } = req.body
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer", "").trim()

    const newPostSchema = Joi.object({
        postId: Joi.number().required()  
    })
    const {error} = newPostSchema.validate({postId: postId})
    if(error) return res.status(422).json({message:'ID do post inválido.'})

    try{
        const checkToken = await client.query(`SELECT * FROM sessions WHERE sessions.token = $1;`, [token])
        if(checkToken.rows.length === 0) return res.status(404).json({message:'Token invalido.'})
        const {userId} = checkToken.rows[0]
        res.locals = {
            postId: postId,
            userId
        }
    }catch(error){
        return res.status(500).json({message: 'Erro ao acessar o banco de dados.'})
    }
    next()
}

export async function getTimelineListValidation(req, res, next){
    try{
        const postsData = await client.query(`SELECT * FROM posts;`)
        const posts = postsData.rows

        const repostsData = await client.query(`SELECT * FROM repost;`)
        const reposts = repostsData.rows

        const timelineList = [...posts, ...reposts]
        res.locals = {
            timelineList
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({message: 'Erro ao acessar o banco de dados.'})
    }
    next()
}