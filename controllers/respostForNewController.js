import client from '../config/db.js'
import { urlMetadataInfo } from '../globalFunctions/urlDataFunction.js'

export const getTimelineListNewPosts = async (req, res) => {
    const { timelineList } = res.locals
    const {timestamp} = req.query;
    try{
        const list = []
        
        for(let post of timelineList){
            let postInfo = {}
            if(post.postsId){   
                const postData = await client.query(`SELECT posts.*, users."userName", users."profilePicture",
                                                    COUNT(comments."postsId") as "countComments"
                                                    FROM posts
                                                    JOIN users ON posts."userId" = users.id
                                                    LEFT JOIN comments ON comments."postsId" = posts.id
                                                    WHERE posts.id=$1
                                                    GROUP BY posts.id, users."userName", users."profilePicture"`, [post.postsId])
                const postRow = postData.rows[0]
                const whoRepostedData = await client.query(`SELECT * FROM users WHERE id = $1;`, [post.userId])
                const repostsData = await client.query(`SELECT * FROM repost WHERE "postsId" = $1;`, [post.postsId])
                const url = await urlMetadataInfo(postRow.link)
                postInfo = {
                    isRepost: true,
                    whoReposted: whoRepostedData.rows[0].userName,
                    userRepostedId: post.userId,
                    userPictureResposted: whoRepostedData.rows[0].profilePicture, 
                    createdAt:post.createdAt,
                    id:postRow.id,
                    userId:postRow.userId,
                    userName: postRow.userName,
                    profilePicture:postRow.profilePicture,
                    message:postRow.message,
                    urlMeta: url,
                    edited:postRow.edited,
                    numberReposts: repostsData.rows.length, 
                    countComments: postRow.countComments
                }
            }else{
                const repostsData = await client.query(`SELECT * FROM repost WHERE "postsId" = $1;`, [post.id])
                const postUserData = await client.query(`SELECT * FROM users WHERE id = $1;`, [post.userId])
                const postUser = postUserData.rows[0]
                const url = await urlMetadataInfo(post.link)
                postInfo = {
                    ...post,
                    userName: postUser.userName,
                    profilePicture:postUser.profilePicture,
                    numberReposts: repostsData.rows.length,
                    urlMeta: url
                }
            }
            list.push(postInfo)
        }
        list.sort((y, x) => (x.createdAt - y.createdAt))
        //let reducedList = list.sort((y, x) => (x.createdAt - y.createdAt)).filter(post => new Date(post.createdAt) < new Date('2040-09-28T22:59:02.448804522Z'));
        //let reducedList = list.sort((y, x) => (x.createdAt - y.createdAt)).filter(post => new Date(post.createdAt) < new Date(timestamp));
        //reducedList = reducedList.slice(0,3);
        /*   for(let postInfo of reducedList) {
            postInfo.urlMeta = await urlMetadataInfo(postInfo.link);
        } */
        
        
        return res.status(200).send(list);
        
    }catch(error){
        console.log(error)
        return res.status(500).json({message: 'Erro ao tentar se conectar com o banco de dados no controller.'})
    }
}