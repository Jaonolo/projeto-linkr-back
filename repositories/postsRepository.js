import db from "../config/db.js";

async function getPostsByHashtag(hashtag) {
    return db.query(
        `SELECT posts.link, posts.message, posts.edited,  users."userName", users."profilePicture" FROM posts
        JOIN "postsHashtags" AS ph ON posts.id = ph."postId"
        JOIN hashtags ON ph."hashtagId" = hashtags.id
        JOIN users ON posts."userId" = users.id
        WHERE hashtags.tag = $1`, [hashtag]
    );
}

export default postsRepository = {getPostsByHashtag};