const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {

    try {
        const postData = await Post.findByPk (req.params.id, {
            include: [{ model: User,
                attributes: ['username'], }],
            });

    if (postData) {
        const post = postData.get({ plain: true });

        res.render('edit-post', {
            post,
            loggedIn: req.session.loggedIn
        })

    } else {
        res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});