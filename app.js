const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('public'))

app.listen(process.env.PORT || 5000)
