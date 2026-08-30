const { check }  = require('express-validator')

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  Post.find()
      .then(posts => {
        res.status(200).json({message: 'Fetched Posts successfully.', posts: posts})
      })
      .catch(err => {
        if (!err.statusCode) {
          console.error('get posts err: ', err)
          err.statusCode = 500
        }
        next(err)
      })
    /*res.status(200).json({posts: [
      {
        _id: '1',
        title: 'First Post', 
        content: 'This is the first post!', 
        imageUrl: 'images/flower.jpg', 
        creator: {
          name: 'Eleonora'
        },
        createdAt: new Date()
      }
    ]})*/
}

exports.createPost = (req, res, next) => {
    const errors = check(req)
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed!')
      error.statusCode = 422
      throw error
      /*return res.status(422).json({
        message: 'Validation failed!', 
        errors: errors.array()
      })*/
    }

    console.log('req: ', req.body)
    const title = req.body.title
    const content = req.body.content

    const post = new Post({
      title: title,
      content: content,
      imageUrl: 'images/flower.jpg',
      creator: {
        name: 'Eleonora'
      }
    })

    post.save()
      .then(result => {
        console.log('post result: ', result)

        res.status(201).json({
          message: 'Post created successfully',
          post: result
        })

      })
      .catch(err => {
        if (!err.statusCode) {
          console.error('post save err: ', err)
          err.statusCode = 500
        }
        next(err)
      })

}

exports.getPost = (req, res, next) => {
  const postId = req.params.postId 
  Post.findById(postId)
      .then(post => {
        if (!post) {
          const error = new Error('Could not find post.')
          error.status = 400
          throw error
        }
        res.status(200).json({message: 'Post fetched.', post: post})
      })
      .catch(err => {
        if (!err.statusCode) {
          console.error('getPost err: ', err)
          err.statusCode = 500
        }
        next(err)
      })
}

/* 
codepen:

const getButton = document.getElementById('get')
const postButton = document.getElementById('post')

getButton.addEventListener('click', () => {
  fetch('http://localhost:8080/feed/posts')
    .then(res => res.json())
    .then(resData => console.log('getButton: ', resData))
    .catch(err => console.log(err))
})


postButton.addEventListener('click', () => {
  fetch('http://localhost:8080/feed/post', {
    method: 'POST',
    body: JSON.stringify({
      title: 'A Codepen Post',
      content: 'Created via Codepen'
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      res.json()
      console.log('res: ', res)
      
    })
    .then(resData => console.log('postButton_log: ', resData))
    .catch(err => console.log('err: ', err))
})
*/