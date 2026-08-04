const express = require('express')
const {body} = require('express-validator');
const feedControler = require('../controllers/feed')
const router = express.Router()

// GET /feed/posts
router.get('/posts', feedControler.getPosts)

// POST /feed/post
router.post(
    '/post', 
    [
        body('title').trim().isLength({max: 5}), 
        body('content').trim().isLength({min: 5})
    ], 
    feedControler.createPost
)

module.exports = router