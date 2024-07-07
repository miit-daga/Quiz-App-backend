// routes/quizRoutes.js
const express = require('express');
const { getQuizQuestions, submitQuizAnswers,addQuizQuestion } = require('../controllers/quizController');

const router = express.Router();

router.get('/quiz/questions', getQuizQuestions);
router.post('/quiz/submit', submitQuizAnswers);
router.post('/quiz/questions', addQuizQuestion);

module.exports = router;
