import Joi from "joi"

import db from ".././config/db.js"

export async function postCommentsValidation(req, res, next){

    const {message} = req.body
    console.log(message)
    const {authorization} = req.headers

    if(isNaN(req.params.postId)){
        return res.sendStatus(422);
    }

    const token = authorization?.replace("Bearer", "").trim()

    const postCommentSchema = Joi.object({
        message: Joi.string().required()  
    })
    const {error} = postCommentSchema.validate({message})
    if(error) return res.status(422).send('Insira um comentário')

    try{
        const isToken = await db.query(`SELECT * FROM sessions WHERE sessions.token = $1;`, [token])
        if(isToken.rows.length === 0) return res.status(404).send('Token invalido.')
        const {userId} = isToken.rows[0]
        res.locals.postComment = {
            userId,
            message
        }
    }catch(error){
        return res.status(500).send( 'Erro ao acessar o banco de dados.')
    }
    next()
}


export async function getCommentsValidation(req, res, next){

    const {authorization} = req.headers

    if(isNaN(req.params.postId)){
        return res.sendStatus(422);
    }

    const token = authorization?.replace("Bearer", "").trim()

    try{
        const isToken = await db.query(`SELECT * FROM sessions WHERE sessions.token = $1;`, [token])
        if(isToken.rows.length === 0) return res.status(404).send('Token invalido.')
        const {userId} = isToken.rows[0]
        res.locals.getComment = {
            userId
        }
    }catch(error){
        return res.status(500).send( 'Erro ao acessar o banco de dados.')
    }
    next()
}



