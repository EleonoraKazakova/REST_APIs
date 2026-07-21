const express = require('express')
const feedControler = require('../controllers/feed')
const router = express.Router()

// GET /feed/posts
router.get('/posts', feedControler.getPosts)

// POST /feed/post
router.post('/post', feedControler.createPost)

module.exports = router