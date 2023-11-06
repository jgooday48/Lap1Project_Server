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

  
app.get('/questions', (req, res) => {
   res.send(questions)
 })  

app.get('/questions/:id', (req, res) => {
  const idx = req.params.id

  const question = questions[idx - 1]
  
  if (!question) {
    res.status(404).json({ message: `questions with id ${idx} not found` })
  } else {
    res.send(question)
  }
  })
  



 module.exports = app
