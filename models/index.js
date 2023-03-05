const Users = require('./users');
const Posts = require('./posts');
const Comments = require('./comments');

Users.hasMany(Posts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Users.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
    });

Posts.belongsTo(Users, {
    foreignKey: 'user_id'
});

Posts.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comments.belongsTo(Users, {
    foreignKey: 'user_id'
});

Comments.belongsTo(Posts, {
    foreignKey: 'post_id'
});

module.exports = { Users, Posts, Comments };