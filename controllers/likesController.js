import db from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

export async function postLikes(req,res){
    
    if(isNaN(req.params.postId)){
        return res.sendStatus(422);
    }

    let userId;
    let postIdInfo;

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
        
        const hasLike = await db.query(`SELECT * FROM likes 
                                        WHERE likes."userId"=$1 
                                        AND likes."postId"=$2`, [parseInt(userId), parseInt(req.params.postId)]);
        
        if(hasLike.rowCount !== 0){
            
            await db.query(`DELETE FROM likes WHERE likes."postId"=$1 
                            AND likes."userId"=$2`, [parseInt(req.params.postId), parseInt(userId)]);
            
            postIdInfo = parseInt(req.params.postId);
        } else {
            
            await db.query(`INSERT INTO likes ("postId", "userId")
                            VALUES ($1, $2)`, [parseInt(req.params.postId), parseInt(userId)]);
            
            postIdInfo = parseInt(req.params.postId);
        }

        
        const countLikesInfo = await db.query(`SELECT COUNT(likes."postId") as likes
                                                FROM likes
                                                WHERE likes."postId"=$1`, [parseInt(req.params.postId)]);

        const infos = [countLikesInfo.rows[0], postIdInfo];
        res.status(200).send(infos);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocorreu um erro na rota post Likes");
    }
}

export const getWhoLiked = async (req, res) => {
    try {
        const { postId } = req.params

        const whoLiked = await db.query(
            `SELECT likes.*, users."userName"
            FROM likes
            JOIN users ON likes."userId" = users.id
            WHERE likes."postId" = $1`,
        [postId]);

        const infos = whoLiked.rows;
        res.status(200).send(infos);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocorreu um erro na rota post Likes");
    }
}