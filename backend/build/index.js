const app = require('express')()
const users = require('../routes/users')
const bodyParser = require('body-parser')
const login = require('../routes/login')
const token = require('../routes/token')
const posts = require('../routes/posts')
const cors = require('cors')
const PORT = 9001
const HOST = '0.0.0.0'

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/users', users)
app.use('/login', login)
app.use('/token', token)
app.use('/posts', posts)

app.listen(PORT, HOST)
