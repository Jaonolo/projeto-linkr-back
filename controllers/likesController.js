import db from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

export async function postLikes(req,res){
    
    if(isNaN(req.params.postId)){
        return res.sendStatus(422);
    }
    console.log('entrei post like')
    let userId;

    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "").trim();
    
    if(!token){
        return res.sendStatus(401);
    }

    try {

        const userAuthorized = await db.query(`SELECT * FROM sessions WHERE "token"=$1`, [token]);
        if(userAuthorized.rowCount == 0){
            return res.sendStatus(401);
        }

        userId = userAuthorized.rows[0].userId;

        await db.query(`INSERT INTO likes ("postId", "userId")
                        VALUES ($1, $2)`, [parseInt(req.params.postId), parseInt(userId)]);
        
        const likesInfo = await db.query(`SELECT COUNT(likes."postId") as likes
                                            FROM likes
                                            WHERE likes."postId"=$1`, [parseInt(req.params.postId)]);


        res.status(200).send(likesInfo.rows);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocorreu um erro na rota post Likes");
    }
}

export async function deleteLikes(req,res){
    
    if(isNaN(req.params.postId)){
        return res.sendStatus(422);
    }
    console.log('entrei delete like')
    let userId;

    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "").trim();
    
    if(!token){
        return res.sendStatus(401);
    }

    try {

        const userAuthorized = await db.query(`SELECT * FROM sessions WHERE "token"=$1`, [token]);
        if(userAuthorized.rowCount == 0){
            return res.sendStatus(401);
        }

        userId = userAuthorized.rows[0].userId;

        await db.query(`DELETE FROM likes WHERE likes."postId"=$1 AND likes."userId"=$2 `, [parseInt(req.params.postId), parseInt(userId)]);
        
        const likesInfo = await db.query(`SELECT COUNT(likes."postId") as likes
                                            FROM likes
                                            WHERE likes."postId"=$1`, [parseInt(req.params.postId)]);

        res.status(200).send(likesInfo.rows);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocorreu um erro na rota post Likes");
    }
}