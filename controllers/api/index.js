const router = require('express').Router();

const usersRoutes = require('./users');
const postsRoutes = require('./posts');
const commentsRoutes = require('./comments');

router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;