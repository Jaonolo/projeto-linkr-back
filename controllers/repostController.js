import client from '../config/db.js'

export const newRepostController = async (req, res) => {
    const { postId, userId } = res.locals
    try{
        await client.query(
            `INSERT INTO repost ("postsId", "userId") 
             VALUES ($1, $2);`, [postId, userId])
        return res.status(201).json({message:'Conteúdo repostado com sucesso.'})
    }catch(error){
        console.log(error)
        return res.status(500).json({message: 'Erro ao tentar se conectar com o banco de dados.'})
    }
}

//LISTA CONTEUDO POSTS E REPOSTS
export const getTimelineList = async (req, res) => {
    const { timelineList } = res.locals
    try{
        const list = []
        let list2 = []
        for(let i=0; i<timelineList.length; i++){
            let post = {}
            if(timelineList[i].postsId){
                const postData = await client.query(`SELECT * FROM posts WHERE id = $1;`, [timelineList[i].postsId])
                const postRow = postData.rows[0]
                const postUserData = await client.query(`SELECT * FROM users WHERE id = $1;`, [postRow.userId])
                const postUser = postUserData.rows[0]
                const whoRepostedData = await client.query(`SELECT * FROM users WHERE id = $1;`, [timelineList[i].userId])
                const repostsData = await client.query(`SELECT * FROM repost WHERE "postsId" = $1;`, [timelineList[i].postsId])

                // Sugestão de query para unir post e user infos com o numero de comentários
                /*  SELECT posts.*, users."userName", users."profilePicture",
                    COUNT(comments."postsId") as "countComments"
                    FROM posts
                    JOIN users ON posts."userId" = users.id
                    LEFT JOIN comments ON comments."postsId" = posts.id
                    WHERE posts.id=1
                    GROUP BY posts.id, users."userName", users."profilePicture" */
                post = {
                    isRepost: true,
                    whoReposted: whoRepostedData.rows[0].userName,
                    userRepostedId: timelineList[i].userId,
                    createdAt:timelineList[i].createdAt,
                    id:postRow.id,
                    userId:postRow.userId,
                    userName: postUser.userName,
                    profilePicture:postUser.profilePicture,
                    link: postRow.link,
                    message:postRow.message,
                    edited:postRow.edited,
                    numberReposts: repostsData.rows.length
                }
            }else{
                const repostsData = await client.query(`SELECT * FROM repost WHERE "postsId" = $1;`, [timelineList[i].id])
                const postUserData = await client.query(`SELECT * FROM users WHERE id = $1;`, [timelineList[i].userId])
                const postUser = postUserData.rows[0]
                post = {
                    ...timelineList[i],
                    userName: postUser.userName,
                    profilePicture:postUser.profilePicture,
                    numberReposts: repostsData.rows.length
                }
            }
            list.push(post)
            list.sort((x, y) => (x.createdAt - y.createdAt)).reverse()
        }
        return res.status(200).send(list)
    }catch(error){
        console.log(error)
        return res.status(500).json({message: 'Erro ao tentar se conectar com o banco de dados no controller.'})
    }
}