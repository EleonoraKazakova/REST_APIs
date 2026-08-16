const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const feedRoutes = require('./routes/feed')
const app = express() 
globalThis.crypto ??= require("node:crypto").webcrypto
//const MONGODB_URI = 'mongodb+srv://eleonorakazakova89_db_user:dSJtbmD77k57I1K8@cluster0.wangstz.mongodb.net/shop?appName=Cluster0'
const MONGODB_URI = 'mongodb+srv://eleonorakazakova89_db_user:dSJtbmD77k57I1K8@cluster0.wangstz.mongodb.net/messages?appName=Cluster0'

// app.use(bodyParser.urlencoded()) // x-www-form-urlencoded <form>
app.use(bodyParser.json()) // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/feed', feedRoutes)

mongoose
  .connect(MONGODB_URI)
  .then(result => app.listen(8080))
  .catch(err => console.error('error mongoose: ', err))


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