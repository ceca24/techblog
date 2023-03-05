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