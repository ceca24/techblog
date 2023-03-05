const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        
        const commentData = await Comment.findAll({
            include: [{ model: User,
                attributes: ['username'], }],
            });
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        
        res.jaon(comments);
    } catch (err) {
        res.status(500).json(err);
    }
        });

router.post('/', withAuth, async (req, res) => {
    const commentBody = req.body;
    try {

        const commentData = await Comment.create({
            ...commentBody,
            user_id: req.session.user_id,
        });

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;