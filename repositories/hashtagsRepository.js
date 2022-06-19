import db from "../config/db.js";

async function getTop10TrendingHashtags() {
    return db.query(
        `SELECT hashtags.tag FROM hashtags
        JOIN "postsHashtags" AS ph ON hashtags.id = ph."hashtagId"
        GROUP BY hashtags.tag
        ORDER BY COUNT (hashtags) DESC
        LIMIT 10`
    );
}

export default hashtagsRepository = {getTop10TrendingHashtags};

