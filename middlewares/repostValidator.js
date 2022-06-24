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

// Novas validações do post e repost com os filtros da timeline, user page e hashtag page

export async function timelineValidation(req, res, next){
    try{
        const {userId} = res.locals;
        const postsData = await client.query(`SELECT posts.*, followers."followerId", followers."followedId", COUNT(comments."postsId") as "countComments"
                                                FROM posts
                                                JOIN followers ON followers."followedId" = posts."userId"
                                                LEFT JOIN comments ON comments."postsId" = posts.id
                                                WHERE followers."followerId"= $1
                                                GROUP BY posts, posts.id, followers."followerId", followers."followedId"`, [userId])
        const posts = postsData.rows

        const repostsData = await client.query(`SELECT repost.*, followers."followerId", followers."followedId" FROM repost
                                                JOIN followers ON followers."followedId" = repost."userId"
                                                WHERE followers."followerId"=$1`, [userId])
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

export async function userPageValidation(req, res, next){
    try{
        
        const postsData = await client.query(`SELECT posts.*, COUNT(comments."postsId") as "countComments"
                                                FROM posts 
                                                LEFT JOIN comments ON comments."postsId"=posts.id
                                                WHERE posts."userId"=$1
                                                GROUP BY posts, posts.id`, [parseInt(req.params.id)])
        const posts = postsData.rows

        const repostsData = await client.query(`SELECT repost.* FROM repost WHERE repost."userId"=$1`, [parseInt(req.params.id)])
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

export async function hashtagPageValidation(req, res, next){
    try{
        let hashtag = "#" + req.params.hashtag;
        const postsData = await client.query(`SELECT posts.*, COUNT(comments."postsId") as "countComments"
                                                FROM posts
                                                LEFT JOIN comments ON comments."postsId" = posts.id
                                                JOIN "postsHashtags" AS ph ON posts.id = ph."postId"
                                                JOIN hashtags ON ph."hashtagId" = hashtags.id
                                                WHERE hashtags.tag = $1
                                                GROUP BY posts.id`, [hashtag])
        const posts = postsData.rows

        const repostsData = await client.query(`SELECT repost.*
                                                    FROM repost
                                                    JOIN posts ON posts.id = repost."postsId"
                                                    JOIN "postsHashtags" AS ph ON posts.id = ph."postId"
                                                    JOIN hashtags ON ph."hashtagId" = hashtags.id
                                                    WHERE hashtags.tag =$1`, [hashtag])
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