import client from '../config/db.js'
export async function timeLineController (req, res){

    try {
        const query = await client.query(`
            SELECT posts.id, posts.message, posts.link, users."profilePicture", users."userName",
            COUNT(likes."postId") as likes
            FROM posts 
            JOIN users ON posts."userId" = users.id
            LEFT JOIN likes ON posts.id = likes."postId"  
            GROUP BY posts.id, posts.message, posts.link, users."profilePicture", users."userName"
            ORDER BY id DESC LIMIT 5`)
        console.log(query.rows)
        for(query.rows.link in query.rows){
            const urlDataInfo = await urlMetadataInfo(postsInfo.rows[postsInfo.rows.link].link)
            urlsInfo.push(urlDataInfo)
        }
        return res.status(200).send(query.rows)

    } catch (error) {
        return res.status(500).send(error)
    }
}