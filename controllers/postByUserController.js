import db from "../config/db.js";
import dotenv from "dotenv";
import {urlMetadataInfo} from "./../globalFunctions/urlDataFunction.js";
import hashtagsRepository from "./../repositories/hashtagsRepository.js"

dotenv.config();

export async function getPostByUser(req,res){

    if(isNaN(req.params.id)){
        return res.sendStatus(422);
    }

    let urlsInfo = [];
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

        const isUser = await db.query(`SELECT * FROM users WHERE id=$1`, [parseInt(req.params.id)])
        if(isUser.rowCount == 0){
            return res.sendStatus(404);
        } 

        const postsInfo = await db.query(`SELECT posts.id, posts.message, posts.link, COUNT(likes."postId") as likes
                                            FROM posts
                                            JOIN users ON posts."userId" = users.id
                                            LEFT JOIN likes ON posts.id = likes."postId" 
                                            WHERE users.id=$1
                                            GROUP BY posts.id, posts.message, posts.link`, [parseInt(req.params.id)]);
        
        const hashtags = await hashtagsRepository.getTop10TrendingHashtags() 

        for(postsInfo.rows.link in postsInfo.rows){
            const urlDataInfo = await urlMetadataInfo(postsInfo.rows[postsInfo.rows.link].link)
            urlsInfo.push(urlDataInfo)
        }

        const whatLiked = await db.query(`SELECT likes."userId" as "UserLiked", posts.id as "idPostLiked", 
                                            u2."userName" as "whoLiked"
                                            FROM likes
                                            JOIN posts ON posts.id = likes."postId" 
                                            JOIN users u2 ON likes."userId" = u2.id 
                                            JOIN users u1 ON posts."userId" = u1.id
                                            WHERE u1.id = $1
                                            GROUP BY likes."userId", posts.id, u2."userName"`, [parseInt(req.params.id)]);

        const sendPostInfo = {
            id: isUser.rows[0].id,
            userName: isUser.rows[0].userName,
            profilePicture: isUser.rows[0].profilePicture,
            allHashtagsInfo: [...hashtags.rows],
            postsInfo: [...postsInfo.rows],
            postsLikesInfo: [...whatLiked.rows],
            ...urlsInfo
        }

    res.status(200).send(sendPostInfo);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocorreu um erro na rota post by user");
    }
}