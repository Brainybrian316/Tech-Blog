const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 2,
        content: 'This is awesome! I love it!'
    },
    {
        user_id: 2,
        post_id: 2,
        content: 'Thank you!'
    },
    {
        user_id: 3,
        post_id: 1,
        content: 'I agree!'
    },
    {
        user_id: 1,
        post_id: 1,
        content: 'Do you really like it?'
    },
    {
        user_id: 1,
        post_id: 3,
        content: 'I use these tips a lot.'
    },
    {
        user_id: 2,
        post_id: 3,
        content: 'I have a few tips for a successful tech career too.'
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;