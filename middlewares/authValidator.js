import client from '../config/db.js'

export const authValidator = async (req, res, next) => {
    try{
        const {authorization} = req.headers
        console.log('token header : ', authorization)
        const token = authorization?.replace("Bearer", "").trim()
        console.log('token: ', token )
        const checkToken = await client.query(`SELECT * FROM sessions s WHERE s.token = $1;`, [token])
        console.log('checkToken : ', checkToken)
        if(checkToken.rows.length === 0) return res.status(401).send({message:'Token invalido.'})
        
        res.locals.userId = checkToken.rows[0].userId
    } catch(error) {
        return res.status(500).send({message: 'Erro ao acessar o banco de dados.'})
    }

    next()
}