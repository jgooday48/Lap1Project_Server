const express = require('express');
const cors = require('cors');
const british = require('./QuestionsBritish.json');
const american = require('./QuestionsAmerican.json');
const logger = require('./logger');

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(logger);

// home route
app.get('/', (req, res) => {
  res.status(200).send({
    message: `Welcome to the history quiz questions API! There are ${british.length} british questions available, and ${american.length} american questions available.`
  });
});

// list of british questions route
app.get('/questions/british', (req, res) => {
  res.send(british);
});

// list of american questions route
app.get('/questions/american', (req, res) => {
  res.send(american);
});

// british question randomiser route
app.get('/questions/british/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * british.length);
  res.status(200).send(british[randomIndex]);
});

// american question randomiser route
app.get('/questions/american/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * american.length);
  res.status(200).send(american[randomIndex]);
});

// specific british question route
app.get('/questions/british/:id', (req, res) => {
  const { id } = req.params;
  const foundQuestion = british.find(
    (question) => question.id === parseInt(id)
  );

  !foundQuestion
    ? res.status(404).send({ error: `Question with id: ${id} not found` })
    : res.status(200).send(foundQuestion);
});

// specific american question route
app.get('/questions/american/:id', (req, res) => {
  const { id } = req.params;
  const foundQuestion = american.find(
    (question) => question.id === parseInt(id)
  );

  !foundQuestion
    ? res.status(404).send({ error: `Question with id: ${id} not found` })
    : res.status(200).send(foundQuestion);
});

// create british question route
app.post('/questions/british', (req, res) => {
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

  newQuestion.id = british.length + 1;
  british.push(newQuestion);

  res.status(201).send(newQuestion);
});

// create american question route
app.post('/questions/american', (req, res) => {
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

  newQuestion.id = american.length + 1;
  american.push(newQuestion);

  res.status(201).send(newQuestion);
});

module.exports = app;
