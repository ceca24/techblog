const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// GET all users
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },{
                    model: Comment,
                }
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    } else {
        res.render('login', {});
    }
});

module.exports = router;