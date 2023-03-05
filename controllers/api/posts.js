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

router.get ('/edit/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
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

router.post ('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put ('/:id', withAuth, async (req, res) => {
    try {
        const [postsToUpdate] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (postsToUpdate > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete ('/:id', async (req, res) => {
    try {
        const postToDelete = Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        console.log(postToDelete.length)
        if (postToDelete.length == 0)
        res.status(404).redirect("/dashboard");
        else{
        res.status(200).end();
        }

    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});


module.exports = router;