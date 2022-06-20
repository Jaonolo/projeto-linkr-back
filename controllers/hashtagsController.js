import hashtagsRepository from "../repositories/hashtagsRepository.js";

export async function getTrendingHashTags(req, res) {

    try {
        const hashtags = await hashtagsRepository.getTop10TrendingHashtags();
        res.send(hashtags.rows);
    } catch (error) {
        res.status(500).send(error);
    }
}
