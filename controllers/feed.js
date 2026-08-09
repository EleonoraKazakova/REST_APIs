const validationResult = require('express-validator')

exports.getPosts = (req, res, next) => {
    res.status(200).json({posts: [
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
    ]})
}

exports.createPost = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({message: 'Validation failed!', errors: errors.array()})
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

    post
      .save()
      .then(result => {
        console.log('post result: ', result)

        res.status(201).json({
          message: 'Post created successfully',
          post: result
        })

      })
      .catch(err => console.error('post err: ', err))

    

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