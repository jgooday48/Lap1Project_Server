const express = require('express');
const cors = require('cors');
const questions = require('./QuestionsBritish.json');
const logger = require('./logger');

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(logger);

// home route
app.get('/', (req, res) => {
  res.status(200).send({
    message: `Welcome to the history quiz questions API! There are ${questions.length} available.`
  });
});

// list of questions route
app.get('/questions', (req, res) => {
  res.send(questions);
});

// question randomiser route
app.get('/questions/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  res.status(200).send(questions[randomIndex]);
});

// specific question route
app.get('/questions/:id', (req, res) => {
  const { id } = req.params;
  const foundQuestion = questions.find(
    (question) => question.id === parseInt(id)
  );

  !foundQuestion
    ? res.status(404).send({ error: `Question with id: ${id} not found` })
    : res.status(200).send(foundQuestion);
});

// create question route
app.post('/questions', (req, res) => {
  const newQuestion = req.body;

  if (
    !newQuestion.question ||
    !newQuestion.answer_1 ||
    !newQuestion.answer_2 ||
    !newQuestion.answer_3 ||
    !newQuestion.correct_answer
  )
    res.status(422).send({
      error:
        'You must provide a question, answer_1 value, answer_2 value, answer_3 value, and a correct_answer value'
    });

  newQuestion.id = questions.length + 1;
  questions.push(newQuestion);

  res.status(201).send(newQuestion);
});

module.exports = app;
