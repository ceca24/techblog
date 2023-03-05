const router = require('express').Router();
const sequelize = require('../config/connection');

const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        constpostData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            incluude: [User],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            posts: posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [User],
        });
        if (postData){

        const post = postData.get({ plain: true });

        res.render('edit-post', {
            post,
            layout: 'dashboard',
        });
    } else {
        res.status(404).end();
    }
}
        catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;