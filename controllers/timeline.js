import client from '../config/db.js'

export async function getTimeline (req, res){
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer", "").trim()

    try {
        // const isThereToken =  await client.query(`SELECT * FROM users`)
        // const isThereToken =  await client.query(`  SELECT * FROM Sessions
        //                                             WHERE token = $1`, [token])
        if(!isThereToken){
           return res.status(401).send("An error occured while trying to fetch the posts, please refresh the page")
        }

        const query = await client.query(`SELECT * FROM Posts ORDERED BY id DESC LIMIT 20`)

        return res.status(200).send(query.rows)

    } catch (error) {
        return res.status(500).send(error)
    }
}