import client from '../config/db.js'

export async function timeLineController (req, res){

    try {
        const query = await client.query(`SELECT * FROM Posts ORDER BY id DESC LIMIT 5`)
        console.log(query.rows)
        return res.status(200).send(query.rows)

    } catch (error) {
        return res.status(500).send(error)
    }
}