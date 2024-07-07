const Quiz = require('../models/quizModel.js');
const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');

// Fetch all quiz questions
exports.getQuizQuestions = async (req, res) => {
    try {
        const questions = await Quiz.find({});
        res.status(200).json({ questions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch quiz questions' });
    }
};

// Submit quiz answers
exports.submitQuizAnswers = async (req, res) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken.user_id;
    const answers = req.body;
    
    try {
        const questions = await Quiz.find({});
        let score = 0;

        questions.forEach((question) => {
            if (answers[question._id] == question.correctAnswer) {
                score += 1;
            }
        });

        // Update the user's quiz score
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's quizScore field with the latest score
        user.quizScore = score;
        await user.save();

        const total = questions.length;

        // Send back updated score and total questions
        res.status(200).json({ score, total });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to submit quiz answers' });
    }
};

// Add new quiz question
exports.addQuizQuestion = async (req, res) => {
    const { question, options, correctAnswer } = req.body;

    if (!question || !options || !correctAnswer) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newQuestion = new Quiz({
            question,
            options,
            correctAnswer,
        });
        await newQuestion.save();
        res.status(201).json({ message: 'Quiz question added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add quiz question' });
    }
};

exports.getQuizScore = async (req, res) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken.user_id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({ score: user.quizScore });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch quiz score' });
    }
};
