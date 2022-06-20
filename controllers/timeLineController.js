import client from '../config/db.js'
import { urlMetadataInfo } from '../globalFunctions/urlDataFunction.js'

export async function timeLineController (req, res){
    const urlsInfo = []

    async function createList(array){
        for(let i = 0; i < array.length; i++){
            const url = await urlMetadataInfo(array[i].link)
            array[i].urlMeta = url
        }
        return array
    }

    try {
        const post = await client.query(`
            SELECT posts.id, users."profilePicture", posts.message, posts.link, users."userName", posts."userId",
            COUNT(likes."postId") as likes
            FROM posts 
            JOIN users ON posts."userId" = users.id
            LEFT JOIN likes ON posts.id = likes."postId"  
            GROUP BY posts.id, posts.message, posts.link, users."profilePicture", users."userName"
            ORDER BY id DESC LIMIT 3`)
        const sendPostList = await createList(post.rows)

        return res.status(200).send(sendPostList)

    } catch (error) {
        return res.status(500).send(error)
    }
}