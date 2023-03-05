const sequelize = require('../config/connection');
const { Users, Posts } = require('../models');

const userData = require('./usersseeds.json');
const postData = require('./postsseeds.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    const users = await Users.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const posts of postData) {
        await Posts.create({
            ...posts,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();