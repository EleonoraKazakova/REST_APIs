const express = require('express')
const bodyParser = require('body-parser')
const feedRoutes = require('./routes/feed')
const app = express() 

// app.use(bodyParser.urlencoded()) // x-www-form-urlencoded <form>
app.use(bodyParser.json()) // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/feed', feedRoutes)

app.listen(8080)

/*
const getButton = document.getElementById('get')
const postButton = document.getElementById('post')

getButton.addEventListener('click', () => {
  fetch('http://localhost:8080/feed/posts')
    .then(res => res.json())
    .then(resData => console.log(resData))
    .catch(err => console.log(err))
})

===
<body>
    <button id='get'>Get Posts</button>
    <button id='post'>Create a Post</button>
    
   <script src="./script.js"></script>

</body>*/