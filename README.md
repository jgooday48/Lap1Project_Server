# Quiz Questions API

This acts as the back-end component of Team Velocity's Quiz App, where quiz questions can be fetched on request, and new quiz questions can be created as well.

## Setup

1. Fork and clone the repository

2. Install required `npm` dependencies for the back-end
   ```sh
   npm install #install dependencies from package.json
   ```
3. Start up the back-end server using the `dev` script
   ```sh
   npm run dev
   ```
4. Go to the `http://localhost:${port}` link outputted in the terminal to access the back-end server

   ```sh
   API listening on port: http://localhost:3000 #exemplar output
   ```

## Routes

| Route               | Method | Response                                                                                                                                                                                                                            |
| ------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                 | `GET`  | Returns a string stating the number of quiz questions available.                                                                                                                                                                    |
| `/questions`        | `GET`  | Returns a JSON object containing all the quiz questions.                                                                                                                                                                            |
| `/questions`        | `POST` | Accepts a JSON object and uses it to create and store a new quiz question.                                                                                                                                                          |
| `/questions/random` | `GET`  | Returns a random quiz question from the collection as a JSON object.                                                                                                                                                                |
| `/questions/:id`    | `GET`  | Returns a JSON object representing a single quiz question from the collection, selected by `:id`. If the id is invalid (non-numeric or out-of-bounds), returns a JSON object explaining the problem, with `404` as the status code. |


## Technologies
- JavaScript
- Express.js
- cors 

## Process
- Started by installing the necessary modules such as express, cors and nodemon
- Created a port 
- Created a logger
- Created two json files with the questions and possible answers
- Edited the main app.js script to allow questions to be displayed on the client side at random

## Wins and Challenges
### Wins
- Got the api to connect successfully to the client side
- Got questions to be outputted at random

## Future Features
- Will add more json files with more quiz categories.
- Update current json files with more questions

