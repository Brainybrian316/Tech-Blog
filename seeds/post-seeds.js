// module
const { Post } = require('../models');

// variable to hold all the posts
const postData = [
    // expects key value pairs (user_id, title, content)
    {
        // title = the title of the post
        title: 'The tech industry is booming',
        // post_content = the actual content of the post
        post_content: 'did you know that the tech industry is booming? There are more than 1.5 million jobs in the tech industry and the average salary for a tech job is $100,000. This is a great news for the tech industry. I am sure that the tech industry will continue to grow and prosper.',
        //  user_id = the id of the user who created the post
        user_id: 1
    },
    {
        title: 'Github is the best thing since sliced bread',
        post_content: 'Reasons why Github is the best: first of all, it is free. Second, it is open source. Third, it is easy to use. Fourth, it is a great place to learn new things. Fifth, it is a great place to work on projects. Sixth, it is a great place to meet new people. Seventh, it is a great place to learn new things. Eighth, it is a great place to work on projects. Ninth, it is a great place to meet new people. Tenth, it is a great place to learn new things. Eleventh, it is a great place to work on projects. Twelfth, it is a great place to meet new people. Thirteenth, it is a great place to learn new things. Fourteenth, it is a great place to work on projects. Fifteenth, it is a great place to meet new people. Sixteenth, it is a great place to learn new things. Seventeenth, it is a great place to work on projects. Eighteenth, it is a great place to meet new people. Nineteenth, it is a great place to learn new things. Twentieth, it is a great place to work on projects. Twenty-first, it is a great place to meet new people. Twenty-second, it is a great place to learn new things. Twenty-third, it is a great place to work on projects. Twenty-fourth, it is a great place to meet new people. Twenty-fifth, it is a great place to learn new things. Twenty-sixth, it is a great place to work on projects. Twenty-seventh, it is a great place to meet new people. Twenty-eighth, it is a great place to learn new things. Twenty-ninth, it is a great place to work on projects. Thirtieth, it is a great place to meet new people. Thirty-first, it is a great place to learn new things. Thirty-second, it is a great place to work on projects. Thirty-third, it is a great place to meet new people. Thirty-fourth, it is a great place to learn new things. Thirty-fifth, it is a great place to work on projects. Thirty-sixth, it is a great place to meet new people. Thirty-seventh, it is a great place to learn new things. Thirty-eighth, it is a great place to work on projects. Thirty-n',
        user_id: 2
    },
    {
        title: ' 5 tips for a successful tech career',
        post_content: 'one of the best things about being a developer is that you can learn from the best. There are many great resources out there that will help you learn from the best. Here are 5 tips for a successful tech career: 1. Learn from the best. There are many great resources out there that will help you learn from the best. Here are 5 tips for a successful tech career: 2. Learn from the best. There are many great resources out there that will help you learn from the best. Here are 5 tips for a successful tech career: 3. Learn from the best. There are many great resources out there that will help you learn from the best. Here are 5 tips for a successful tech career: 4. Learn from the best. There are many great resources out there that will help you learn from the best. Here are 5 tips for a successful tech career: 5. Learn from the best. There are many great resources out there that will help you learn from the best. Here are 5 tips for a successful tech career: 6. Learn from the best. There are many great resources out there that will help you learn from the best. Here are 5 tips for a successful tech career: 7. Learn from the best. There are many great resources out there that will help you learn from the best. Here are 5 tips for a successful tech career: 8. Learn from the best. There are many great resources out there that will help you learn from the best. Here are 5 tips for a successful tech career: 9. Learn from the best. There are many great resources out there that will help you learn from the best. Here are 5 tips for a successful tech career: 10. Learn from the best. There are many great resources out there that will help you learn from the best. Here are 5 tips for a successful tech career: 11. Learn from the best. There are many great resources out there that will help you learn from the best. Here are 5 tips for a successful tech career: 12. Learn from the best. There are many great resources out there that will help you learn from the best. Here are 5 tips for a successful tech career: 13. Learn from the best. There are many great resources out there that will help you learn from the best. Here are 5 tips for a successful tech career: 14. Learn from the best. There are many great resources out there that will help you learn from the best. Here are 5 tips',
        user_id: 3
    }
]

// variable to hold all the comments for each post in the postData array
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;