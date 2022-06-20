import db from "../config/db.js";

async function getPostsByHashtag(hashtag) {
    return db.query(
        `SELECT posts.link, posts.message, posts.edited,  users."userName", users."profilePicture",  COUNT(likes."postId") as likes
        FROM posts
        JOIN "postsHashtags" AS ph ON posts.id = ph."postId"
        JOIN hashtags ON ph."hashtagId" = hashtags.id
        JOIN users ON posts."userId" = users.id
        LEFT JOIN likes ON posts.id = likes."postId"
        WHERE hashtags.tag = $1
        GROUP BY posts.id, posts.message, posts.link, posts.edited, users."userName", users."profilePicture"`, [hashtag]
    );
}

const postsRepository = {getPostsByHashtag};

export default postsRepository;