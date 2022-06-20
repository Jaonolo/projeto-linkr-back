import Joi from "joi"

import client from '../config/db.js'

export async function newPostValidation(req, res, next){
    const {link, message} = req.body
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer", "").trim()

    const newPostSchema = Joi.object({
        link: Joi.string().uri().required()  
    })
    const {error} = newPostSchema.validate({link})
    if(error) return res.status(422).json({message:'Insira um link válido.'})

    try{
        const checkToken = await client.query(`SELECT * FROM sessions WHERE sessions.token = $1;`, [token])
        if(checkToken.rows.length === 0) return res.status(404).json({message:'Token invalido.'})
        const {userId} = checkToken.rows[0]
        res.locals.postData = {
            userId,
            link,
            message
        }
    }catch(error){
        return res.status(500).json({message: 'Erro ao acessar o banco de dados.'})
    }
    next()
}

export async function editPostValidation(req, res, next){
    const { id, userId, message } = req.body
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer", "").trim()

    const editPostSchema = Joi.object({
        id: Joi.number().required(),
        userId: Joi.number().required(),
        message: Joi.string().required()  
    })
    const {error} = editPostSchema.validate({id, userId, message})
    if(error){
        console.log(id)
        return res.status(422).json({message:'Não foi possível editar sua postagem.'})
    }

    try{
        const sessionData = await client.query(`SELECT * FROM sessions WHERE sessions.token = $1;`, [token])
        if(sessionData.rows.length===0) return res.status(404).json({message:'Não é possivel utilizar o token atual.'})
        const session = sessionData.rows[0]
        if(session.userId != parseInt(userId)) return res.status(422).json({message:'Você não tem permissão para editar este post.'})

        res.locals.editPostData = {
            id: id,
            message: message,
            userId: session.userId
        }
    }catch(error){
        return res.status(500).json({message: 'Erro ao acessar o banco de dados.'})
    }
    next()
}

export async function deletePostValidation(req, res, next){
    const { id } = req.params
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer", "").trim()
    
    const deletePostSchema = Joi.object({
        id: Joi.number().required() 
    })
    const {error} = deletePostSchema.validate({id})
    if(error){
        return res.status(422).json({message:'ID invalido Impossivel deletar.'})
    }
    try{
        const postData = await client.query(
            `SELECT * FROM posts
             JOIN sessions ON sessions.token = $1
             WHERE posts."userId" = sessions."userId" AND posts.id = $2;`, [token, id])
        if(postData.rows.length===0) return res.status(404).json({message:'Você não tem permissão para deletar este post.'})
        res.locals = {id: id}
    }catch(error){
        return res.status(500).json({message: 'Erro ao acessar o banco de dados.'})
    }
    next()
}