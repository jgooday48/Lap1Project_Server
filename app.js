const express = require('express')
const cors = require('cors')
const questions = require('./QuestionsBritish.json')
const logger = require('./logger')

const app = express()

// MIDDLEWARE

app.use(cors())
app.use(express.json())
app.use(logger)

app.get('/', (req, res) => {
    res.status(200).send('History Quiz Website')
  })
  
  
 