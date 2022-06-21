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

export const getTimelineList = async (req, res) => {
    const { timelineList } = res.locals
    try{
        const list = []
        for(let i=0; i<timelineList.length; i++){
            let post = {}
            if(timelineList[i].postsId){
                const postData = await client.query(`SELECT * FROM posts WHERE id = $1;`, [timelineList[i].postsId])
                const whoRepostedData = await client.query(`SELECT * FROM users WHERE id = $1;`, [timelineList[i].userId])
                post = {
                    isRepost: true,
                    whoReposted: whoRepostedData.rows[0].userName,
                    createdAt:timelineList[i].createdAt,
                    post: {...postData.rows[0]}
                }
            }else{
                post = timelineList[i]
            }
            list.push(post)
        }
        return res.status(200).send(list)
    }catch(error){
        console.log(error)
        return res.status(500).json({message: 'Erro ao tentar se conectar com o banco de dados no controller.'})
    }
}