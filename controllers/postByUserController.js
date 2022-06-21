import db from "../config/db.js";
import {urlMetadataInfo} from "./../globalFunctions/urlDataFunction.js";

export async function getPostByUser(req,res){

    if(isNaN(req.params.id)){
        return res.sendStatus(404);
    }

    try {

        const posts = await db.query(
            `SELECT posts.id, users."profilePicture", posts.message, posts.link, users."userName", posts."userId",
            COUNT(likes."postId") as likes
            FROM posts 
            JOIN users ON posts."userId" = users.id
            LEFT JOIN likes ON posts.id = likes."postId"
            WHERE users.id = $1
            GROUP BY posts.id, posts.message, posts.link, users."profilePicture", users."userName"
            ORDER BY id DESC`,
        [parseInt(req.params.id)]);

        for(let post of posts.rows) {
            post.urlMeta = await urlMetadataInfo(post.link)
        }

        res.status(200).send(posts.rows);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}