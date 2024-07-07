// routes/quizRoutes.js
const express = require('express');
const { getQuizQuestions, submitQuizAnswers,addQuizQuestion,getQuizScore } = require('../controllers/quizController');

const router = express.Router();

router.get('/quiz/questions', getQuizQuestions);
router.post('/quiz/submit', submitQuizAnswers);
router.post('/quiz/questions', addQuizQuestion);
router.get('/quiz/score', getQuizScore);


module.exports = router;
