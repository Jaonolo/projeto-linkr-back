import db from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

export async function postComments(req,res){

    const {userId, message} = res.locals.postComment
    
    try{

        await db.query(`INSERT INTO comments ("postId", "userId", "text")
                        VALUES ($1, $2, $3)`, [parseInt(req.params.postId), parseInt(userId), message]);
        
        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocorreu um erro na rota post comments");
    }
}

export async function getComments(req,res){

    //const {userId} = res.locals.postComment
    const userId = 1;
    let commentsObj;

    try {

        const commentsInfos = await db.query(`SELECT comments."userId" as "whoCommentId", 
                                                users."profilePicture", users."userName", 
                                                comments.text as "whatComment", posts."userId" as "postOwnerId"
                                                FROM comments
                                                JOIN users ON users.id = comments."userId"
                                                JOIN posts ON posts.id = comments."postId"
                                                WHERE posts.id = $1
                                                GROUP BY comments."userId", 
                                                users."profilePicture", users."userName", 
                                                comments.text, posts."userId"`, [parseInt(req.params.postId)])
    
        const followersInfo = await db.query(`SELECT followers."follwerId" as "whoFollows",
                                                followers."followedId" as "whoIsFollowed"
                                                FROM followers
                                                WHERE followers."follwerId"=$1`, [userId])
        

        if(commentsInfos.rows.length !== 0){
                commentsObj = commentsInfos.rows?.map((commentInfo) => {
                    console.log(commentInfo.whoCommentId == commentInfo.postOwnerId)
                    if(commentInfo.whoCommentId == commentInfo.postOwnerId){
                        return {
                                ...commentInfo,
                                postOwner: true
                        }}else if(followersInfo.rows.filter((e) => e.whoIsFollowed == commentInfo.whoCommentId).length != 0){
                                return {
                                        ...commentInfo,
                                        following: true
                                    }
                        }else  return {
                        ...commentInfo
                    }
                    })
        } else {
            return res.status(200).send([commentsInfos, followersInfo])
        }

        return res.status(200).send(commentsObj)
    
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocorreu um erro na rota get comments");
    }
}