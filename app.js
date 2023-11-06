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
  res
    .status(200)
    .send(
      `Welcome to the history quiz questions API! There are ${questions.length} available.`
    );
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

module.exports = app;
