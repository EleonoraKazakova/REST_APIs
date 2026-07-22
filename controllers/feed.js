exports.getPosts = (req, res, next) => {
    res.status(200).json({posts: [{title: 'First Post', content: 'This is the first post!'}]})
}

exports.createPost = (req, res, next) => {
    console.log('req: ', req.body)
    const title = req.body.title
    const content = req.body.content

    // Create post in db
    res.status(201).json({
        message: 'Post created successfully',
        post: {id: new Date().toISOString(), title: title, content: content}
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