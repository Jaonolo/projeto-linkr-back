import client from '../config/db.js'

export const getUser = async (req, res) => {
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer", "").trim()

    try {
        const result = await client.query(
            `SELECT users.id, users."userName", users."profilePicture"
             FROM users
             JOIN sessions ON sessions.token = $1
             WHERE users.id = sessions."userId";`, [token])
        const user = result.rows[0]
        return res.status(200).send(user)
    } catch(error) { 
        return res.status(500).send(error) 
    }
}

export const getUsersByName = async (req, res) => {
    try {
        const {searchString} = req.body
        const result = await client.query(
            `SELECT users.id, users."userName", users."profilePicture"
             FROM users
             WHERE users."userName" LIKE $1;`, [searchString + '%'])
        return res.status(200).send(result)
    } catch(error) { 
        return res.status(500).send(error) 
    }
}

export const getUsersByNameFollowersFirst = async (req, res) => {
    try {
        const {searchString} = req.body
        const result = await client.query(
            `SELECT * FROM (
                (
                    SELECT users.id, users."userName", users."profilePicture", (users.id IN (
                        SELECT followers."followedId" FROM followers
                        WHERE followers."followerId" = $1
                    )) AS follower FROM users
                )
            ) AS result WHERE result."userName" LIKE $2
            ORDER BY follower DESC;`,
            [res.locals.userId, searchString + '%']
        )
        return res.status(200).send(result)
    } catch(error) { 
        return res.status(500).send(error) 
    }
}

/*
export const getUserById = async (req, res) => {

    const id = parseInt(req.params.id);

    try {
        const user = await client.query(
            `SELECT users."userName", users."profilePicture"
            FROM users
            WHERE users.id = $1;`, [id]);
        
        if(user.rowCount == 0)
            return res.sendStatus(404);

        return res.send(user.rows[0]);

    } catch (error) {
        res.status(500).send(error);
    }
}*/

export const checkIfFollows = async (req, res) => {
    try {
        const { userId, followId } = req.params;
        console.log(userId, followId)
        const result = await client.query(
            `
            SELECT * FROM followers WHERE "followerId" = $1 AND "followedId" = $2;
            `, [userId, followId]
        )
        if (result.rows.length === 0)
        return res.send(false);
        else
        return res.send(true);   
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const follow = async (req, res) => {
    try {
        const { userId, followId } = req.params;
        console.log(userId, followId)
        const result = await client.query(
            `
            SELECT * FROM followers WHERE "followerId" = $1 AND "followedId" = $2;
            `, [userId, followId]
        )
        if (result.rows.length === 0)
        {
            await client.query(
                `
                INSERT INTO followers ("followerId", "followedId")
                VALUES ($1, $2);
                `, [userId, followId]
            )
            return res.sendStatus(200);
        }
        else
        return res.sendStatus(404);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const unfollow = async (req, res) => {
    try {
        const { userId, followId } = req.params;
        console.log(userId, followId)
        const result = await client.query(
            `
            SELECT * FROM followers WHERE "followerId" = $1 AND "followedId" = $2;
            `, [userId, followId]
        )
        if (result.rows.length != 0)
        {
            await client.query(
                `
                DELETE FROM followers WHERE "followerId" = $1 AND "followedId" = $2;
                `, [userId, followId]
            )
            return res.sendStatus(200);
        }
        else
        return res.sendStatus(404);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const numberOfFollows = async (req, res) => {
    try
    {
        const { id } = req.params;
        const result = await client.query(
            `
            SELECT * FROM followers WHERE "followerId" = $1;
            `, [id]
        )
        if(result.rows.length === 0)
        return res.send(false)
        else
        return res.send(true)
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}