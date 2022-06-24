import Joi from "joi"

import client from '../config/db.js'

export async function testeValidation(req, res, next){
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

export async function testeValidation2(req, res, next){
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

export async function testeValidation3(req, res, next){
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