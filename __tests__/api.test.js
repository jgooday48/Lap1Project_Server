const app = require('../app');
const request = require('supertest');
const fs = require('fs');
const path = require('path');

describe('api server', () => {
  let api;

  beforeAll(() => {
    api = app.listen(6000, () => {
      console.log('Test server running on port 6000');
    });
  });

  afterAll((done) => {
    console.log('Gracefully stopping test server');
    api.close(done);
  });

  // ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
  // ⚠️ the API Structure tests are not expected to be seen in projects
  // ⚠️ They are just here to make sure that you respect the structure
  // ⚠️ defined in the lecture

  describe('API Structure', () => {
    test('app.js exists', () => {
      const file = path.join(__dirname, '..', 'app.js');
      const fileExists = fs.existsSync(file);
      expect(fileExists).toBe(true);
    });

    test('index.js exists', () => {
      const file = path.join(__dirname, '..', 'index.js');
      const fileExists = fs.existsSync(file);
      expect(fileExists).toBe(true);
    });

    test('QuestionsAmerican.json exists', () => {
      const file = path.join(__dirname, '..', 'QuestionsAmerican.json');
      const fileExists = fs.existsSync(file);
      expect(fileExists).toBe(true);
    });

    test('QuestionsBritish.json exists', () => {
      const file = path.join(__dirname, '..', 'QuestionsBritish.json');
      const fileExists = fs.existsSync(file);
      expect(fileExists).toBe(true);
    });
  });

  // the API Structure tests are not expected to be seen in projects ⚠️
  // They are just here to make sure that you respect the structure  ⚠️
  // defined in the lecture                                          ⚠️
  //  ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

  describe('/', () => {
    test('responds to GET / with status 200', (done) => {
      request(api).get('/').expect(200, done);
    });
  });

  describe('GET /questions/british -- index', () => {
    test('responds to GET /questions/british with status 200', (done) => {
      request(api).get('/questions/british').expect(200, done);
    });

    test('GET /questions/british displays 10 elements in the web browser', async () => {
      const response = await request(api).get('/questions/british');
      expect(response.body.length).toBe(10);
    });
  });

  describe('GET /questions/american -- index', () => {
    test('responds to GET /questions/american with status 200', (done) => {
      request(api).get('/questions/american').expect(200, done);
    });

    test('GET /questions/american displays 10 elements in the web browser', async () => {
      const response = await request(api).get('/questions/american');
      expect(response.body.length).toBe(10);
    });
  });

  describe('GET /questions/british/:id -- show', () => {
    test('responds to GET /questions/british/1 with status 200', (done) => {
      request(api).get('/questions/british/1').expect(200).expect(
        {
          question:
            "Who out of the following was not one of Henry VIII's wives?",
          answer_1: 'Catherine of Aragon',
          answer_2: 'Catherine Parr',
          answer_3: 'Anne of Cleeves',
          correct_answer: 'Elizabeth of York',
          id: 1
        },
        done
      );
    });

    test('responds to a unknown question id with a 404', (done) => {
      request(api)
        .get('/questions/british/42')
        .expect(404)
        .expect({ error: 'Question with id: 42 not found' }, done);
    });
  });

  describe('GET /questions/american/:id -- show', () => {
    test('responds to GET /questions/american/1 with status 200', (done) => {
      request(api).get('/questions/american/1').expect(200).expect(
        {
          question: 'Who was the first US President?',
          answer_1: 'Benjamin Franklin',
          answer_2: 'John Adams',
          answer_3: 'Calvin Coolidge',
          correct_answer: 'George Washington',
          id: 1
        },
        done
      );
    });

    test('responds to a unknown question id with a 404', (done) => {
      request(api)
        .get('/questions/american/42')
        .expect(404)
        .expect({ error: 'Question with id: 42 not found' }, done);
    });
  });

  describe('POST /questions/british', () => {
    test('responds to POST /questions/british with status 201', (done) => {
      const testData = {
        question: 'How are you today?',
        answer_1: 'ok',
        answer_2: 'not bad',
        answer_3: 'pretty good',
        correct_answer: 'amazing'
      };
      request(api)
        .post('/questions/british')
        .send(testData)
        .set('Accept', 'application/json')
        .expect(201)
        .expect({ ...testData, id: 11 }, done);
    });

    test('throws a 422 if create unsuccessful', (done) => {
      const testData = { age: 99 };

      request(api)
        .post('/questions/british')
        .send(testData)
        .set('Accept', 'application/json')
        .expect(422)
        .expect(
          {
            error:
              'You must provide a question, answer_1 value, answer_2 value, answer_3 value, and a correct_answer value'
          },
          done
        );
    });
  });

  describe('POST /questions/american', () => {
    test('responds to POST /questions/american with status 201', (done) => {
      const testData = {
        question: 'How are you today?',
        answer_1: 'ok',
        answer_2: 'not bad',
        answer_3: 'pretty good',
        correct_answer: 'amazing'
      };
      request(api)
        .post('/questions/american')
        .send(testData)
        .set('Accept', 'application/json')
        .expect(201)
        .expect({ ...testData, id: 11 }, done);
    });

    test('throws a 422 if create unsuccessful', (done) => {
      const testData = { age: 99 };

      request(api)
        .post('/questions/american')
        .send(testData)
        .set('Accept', 'application/json')
        .expect(422)
        .expect(
          {
            error:
              'You must provide a question, answer_1 value, answer_2 value, answer_3 value, and a correct_answer value'
          },
          done
        );
    });
  });
});
