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